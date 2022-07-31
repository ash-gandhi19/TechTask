const { sendJsonResponse } = require("../config/response_re");
const { roles } = require("../config/constants");
module.exports.permit = (allowedRoles = []) => {
  return (req, res, next) => {
    if (req.role == roles.Admin) {
      return next();
    }

    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    sendJsonResponse(res, 403, {
      status: "err",
      message: "Unauthorized access",
    });
  };
};
