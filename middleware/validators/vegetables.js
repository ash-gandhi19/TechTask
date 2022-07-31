const Joi = require("joi");
const { isValidObjectId } = require("mongoose");
const { toCustomValidationError } = require("../../config/custom_err");
const { sendJsonResponse } = require("../../config/response_re");

const vegetableschema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().precision(2).positive().greater(1).required(),
  color: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});

module.exports = (req, res, next) => {
  let schema = vegetableschema;

  try {
    if (req.method == "PUT") {
      if (!isValidObjectId(req.params.id)) {
        return sendJsonResponse(res, 422, {
          status: "err",
          message: "Invalid id",
        });
      }

      schema = vegetableschema;
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
