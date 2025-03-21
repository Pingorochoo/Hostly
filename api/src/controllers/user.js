const { generateToken, verifyToken } = require("../config/jwtToken");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({ name, email, password });
    res.status(201).json({ message: "User created successfully", userDoc });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLoggedInUser = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const { id } = verifyToken(token);
      const { name, email } = await User.findById(id);
      res.status(200).json({ name, email });
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(500).json({ user: "not user" });
  }
};

const logout = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(200).json({ message: "Already logged out" });
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 0,
      })
      .json({ message: "logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error during logout, message: ${error.message}` });
  }
};
module.exports = {
  register,
  login,
  getLoggedInUser,
  logout,
};
