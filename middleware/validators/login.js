const Joi = require("joi");
const { toCustomValidationError } = require("../../config/custom_err");
const { sendJsonResponse } = require("../../config/response_re");
const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return sendJsonResponse(res, 422, toCustomValidationError(error));
    }

    next();
  } catch (err) {
    sendJsonResponse(res, 500, err);
  }
};
