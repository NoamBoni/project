const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isEmail, "invalid email"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["buyer", "editor", "admin"],
    default: "buyer",
  },
  address: {
    type: String,
    reuired: true,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
  next();
});

userSchema.methods.comparePasswords = async function (rawPassword) {
  return await bcrypt.compare(rawPassword, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
