var bcrypt = require("bcryptjs");
var saltRound = 10;

module.exports.hash = async (pwd) => {
  let salt = await bcrypt.genSalt(saltRound);
  let hash = await bcrypt.hash(pwd, salt);
  return hash;
};

module.exports.comparepass = async (pwd, salt) => {
  let comparepass = await bcrypt.compare(pwd, salt);
  return comparepass;
};
