const User = require("../models/User");
const { hash } = require("../config/password_util");
const { sendJsonResponse } = require("../config/response_re");
const limit_ = 5;

//Create a new user

module.exports.create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return sendJsonResponse(res, 422, {
        status: "err",
        message: "Email has already taken",
      });
    }

    user = new User(req.body);

    // hashing password
    user.password = await hash(user.password);

    await user.save();

    sendJsonResponse(res, 200, user.toJSON());
  } catch (error) {
    console.error(error);
    sendJsonResponse(res, 500, {
      status: "err",
      message: "Internal server error",
    });
  }
};

/**
 * Returns list of users
 */
module.exports.list = async (req, res) => {
  try {
    let aggregate_options = [];

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || limit_;

    //set the options for pagination
    const options = {
      page,
      limit,
      collation: { locale: "en" },
      customLabels: {
        totalDocs: "totalResults",
        docs: "list",
      },
    };

    let match = {};

    if (req.query.q) match.firstname = { $regex: req.query.q, $options: "i" };

    if (req.query.q) match.lastname = { $regex: req.query.q, $options: "i" };
    if (req.query.q) match.email = { $regex: req.query.q, $options: "i" };
    if (req.query.q) match.role = { $regex: req.query.q, $options: "i" };
    aggregate_options.push({ $match: match });

    let sortOrder =
      req.query.sort_order && req.query.sort_order === "desc" ? -1 : 1;

    if (req.query.sortBy && req.query.sortOrder) {
      var sort = {};
      sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
      aggregate_options.push({
        $sort: sort,
      });
    } else {
      aggregate_options.push({
        $sort: { createdAt: -1 },
      });
    }
    const myAggregate = User.aggregate(aggregate_options);
    const users = await User.aggregatePaginate(myAggregate, options);

    sendJsonResponse(res, 200, users);
  } catch (error) {
    sendJsonResponse(res, 500, error);
  }
};

/**
 * Returns a single user
 */
module.exports.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    sendJsonResponse(res, 200, user);
  } catch (error) {
    sendJsonResponse(res, 500, error);
  }
};

/**
 * Update a user
 */
module.exports.update = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return sendJsonResponse(res, 404, {
        status: "err",
        message: "User not found",
      });
    }

    await user.update(req.body);

    sendJsonResponse(res, 200, {
      _id: user.id,
      ...req.body,
      message: "Data updated successfully",
    });
  } catch (error) {
    console.error(error);
    sendJsonResponse(res, 500, {
      status: "err",
      message: "Internal server error",
    });
  }
};

/**
 * Deletes a user
 */
module.exports.delete = async (req, res) => {
  try {
    if (req.params.id == req.user.id) {
      sendJsonResponse(res, 400, {
        status: "error",
        message: "Cannot delete your own account",
      });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      await user.delete();
    }

    sendJsonResponse(res, 200, {
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    sendJsonResponse(res, 500, error);
  }
};
