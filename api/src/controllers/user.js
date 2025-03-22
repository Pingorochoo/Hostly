const { generateToken, verifyToken } = require("../config/jwtToken");
const { asyncHandler } = require("../middlwares/asyncHandler");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = await User.create({ name, email, password });
  res.status(201).json({ message: "User created successfully", userDoc });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc && (await userDoc.passwordMatch(password))) {
    const { _id, name } = userDoc;
    const token = generateToken(_id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        _id,
        name,
        email,
        token,
      });
  } else {
    throw new Error("Invalid credentials");
  }
};
const getLoggedInUser = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { id } = verifyToken(token);
    const { name, email } = await User.findById(id);
    res.status(200).json({ name, email });
  } else {
    res.status(200).json(null);
  }
};

const logout = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(200).json({ message: "Already logged out" });
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 0,
    })
    .json({ message: "Logged out successfully" });
};
module.exports = {
  register: asyncHandler(register),
  login: asyncHandler(login),
  getLoggedInUser: asyncHandler(getLoggedInUser),
  logout: asyncHandler(logout),
};
