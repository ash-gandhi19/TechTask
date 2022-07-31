const Vegetables = require("../models/Vegetables");
const { sendJsonResponse } = require("../config/response_re");

/**
 * Create a new vegetables
 */
module.exports.create = async (req, res) => {
  try {
    let vegetables = await Vegetables.findOne({ name: req.body.name });

    if (vegetables) {
      return sendJsonResponse(res, 422, {
        status: "err",
        message: "NAme has already exist",
      });
    }

    vegetables = new Vegetables(req.body);
    await vegetables.save();
    sendJsonResponse(res, 200, vegetables.toJSON());
  } catch (error) {
    console.error(error);
    sendJsonResponse(res, 500, {
      status: "err",
      message: "Internal server error",
    });
  }
};

/**
 * Returns list of vegetables
 */
module.exports.list = async (req, res) => {
  try {
    const vegetableslist = await Vegetables.paginate(
      { _id: { $ne: req.user._id } },
      { lean: true }
    );
    sendJsonResponse(res, 200, vegetableslist);
  } catch (error) {
    sendJsonResponse(res, 500, error);
  }
};

/**
 * Returns a single vegetables
 */
module.exports.show = async (req, res) => {
  try {
    const vegetables = await Vegetables.findById(req.params.id).lean();
    if (vegetables) {
      sendJsonResponse(res, 200, vegetables);
    } else {
      sendJsonResponse(res, 400, {
        status: "error",
        message: "Please enter valid Id.",
      });
    }
  } catch (error) {
    sendJsonResponse(res, 500, error);
  }
};

/**
 * Update a vegetables
 */
module.exports.update = async (req, res) => {
  try {
    let vegetables = await Vegetables.findById(req.params.id);

    if (!vegetables) {
      return sendJsonResponse(res, 404, {
        status: "err",
        message: "vegetables not found",
      });
    }

    await vegetables.update(req.body);

    sendJsonResponse(res, 200, {
      _id: vegetables.id,
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
 * Deletes a vegetables
 */
module.exports.delete = async (req, res) => {
  try {
    const vegetables = await Vegetables.findById(req.params.id);

    if (vegetables) {
      await vegetables.delete();
    } else {
      sendJsonResponse(res, 400, {
        status: "error",
        message: "Please enter valid Id.",
      });
    }

    sendJsonResponse(res, 200, {
      status: "success",
      message: "Vegetables deleted successfully",
    });
  } catch (error) {
    sendJsonResponse(res, 500, error);
  }
};
