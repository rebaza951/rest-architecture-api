const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, require: true },
  username: { type: String, requied: true },
  password: { type: String, requied: true },
});

// methods
UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

// HOOKS
// trigger every time user attribute is saved
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model("user", UserSchema);
