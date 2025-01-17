const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
};
