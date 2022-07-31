const fs = require("fs");
const tldjs = require("tldjs");

const free = fs
  .readFileSync(__dirname + "/free_email_provider_domains.txt")
  .toString()
  .split("\n");

const getDomain = (email) => {
  if (typeof email !== "string") throw new TypeError("email must be a string");
  return tldjs.getDomain(email.split("@").pop());
};

const isFree = (email) => free.indexOf(getDomain(email)) !== -1;

module.exports.validatemail = (email) => {
  const domain = getDomain(email);

  if (!isFree(domain)) {
   // console.log(1);
    return true;
  } else {
   // console.log(2);
    return false;
  }
};
