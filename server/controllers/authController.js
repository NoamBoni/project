const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { sendRes } = require("../helpers/sendRes");

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    const user = await User.create({ username, email, password, address });
    const token = signJWT(user._id);
    res.cookie("token", token, {
      secure: process.env.ENVIRONMENT !== "development",
      httpOnly: process.env.ENVIRONMENT !== "development",
    });
    sendRes(res, user, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePasswords(password)))
      throw new Error("invalid credentials");
    const token = signJWT(user._id);
    res.cookie("token", token, {
      secure: process.env.ENVIRONMENT !== "development",
      httpOnly: process.env.ENVIRONMENT !== "development",
    });
    sendRes(res, user, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("please login to continue");
    const { id, exp } = jwt.verify(token, process.env.JWT_SECRET);
    if (Math.floor(Date.now() / 1000) > exp)
      throw new Error("login expired, please login again");
    const user = await User.findById(id);
    if (!user) throw new Error("invalid user, please login again");
    req.user = user;
  } catch (err) {
    sendRes(res, err, 403, true);
    return;
  }
  next();
};
