const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { roles } = require("../config/constants");
const { validatemail } = require("../config/email_validate");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
function validatePassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return re.test(password);
}
//------------ User Schema ------------//
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: [validatemail, "Please fill a valid domain"],
      required: true,
    },
    password: {
      type: String,
      validate: [validatePassword, "valid password"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "valid password",
      ],
      required: true,
    },
    role: {
      required: true,
      type: String,
      enum: [...Object.values(roles)],
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/ashtext/image/upload/v1656949652/user1_gsbqxv.png",
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET
  );
  return token;
};

UserSchema.methods.isAdmin = function () {
  return this.role == roles.Admin;
};

UserSchema.plugin(aggregatePaginate);
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", UserSchema);

module.exports = User;
