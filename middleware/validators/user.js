const Joi = require("joi");
const { isValidObjectId } = require("mongoose");
const { roles } = require("../../config/constants");
const { toCustomValidationError } = require("../../config/custom_err");
const { sendJsonResponse } = require("../../config/response_re");

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const postSchema = Joi.object({
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(strongPasswordRegex).required(),
  role: Joi.string()
    .valid(...Object.values(roles))
    .required(),
});

module.exports = (req, res, next) => {
  let schema = postSchema;

  try {
    if (req.method == "PUT") {
      if (!isValidObjectId(req.params.id)) {
        return sendJsonResponse(res, 422, {
          status: "err",
          message: "Invalid id",
        });
      }

      schema = postSchema;
    }

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return sendJsonResponse(res, 420, toCustomValidationError(error));
    }

    next();
  } catch (err) {
    console.error(err);
    sendJsonResponse(res, 500, err);
  }
};
