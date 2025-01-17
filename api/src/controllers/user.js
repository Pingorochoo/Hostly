const { generateToken } = require("../config/jwtToken");
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
      const token = generateToken(userDoc._id);
      res.cookie("token", token).json({ message: "login successful"});
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
