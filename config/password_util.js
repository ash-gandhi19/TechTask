var bcrypt = require("bcryptjs");
var saltRound = 10;
var JWT = require("jsonwebtoken");
var JWTD = require("jwt-decode");
var secret = "rgerdgerksknfjbekjb@nkj*&153";

module.exports.hash = async (pwd) => {
  let salt = await bcrypt.genSalt(saltRound);
  let hash = await bcrypt.hash(pwd, salt);
  return hash;
};

module.exports.compare = async (pwd, salt) => {
  const validPassword = await bcrypt.compare(pwd, salt);

  return validPassword;
};

// var hashCompare = async (pwd, salt) => {
//   let result = await bcrypt.compare(pwd, salt);
//   return result;
// };

//module.exports = { hashPassword, hashCompare };
