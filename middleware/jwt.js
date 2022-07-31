const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send("Please login to access the content!");
    }
  } else {
    res.status(401).send("Please provide token,to access.");
  }
};
module.exports = isAuthenticated;
