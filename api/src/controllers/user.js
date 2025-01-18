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
      res.cookie("token", token).json({
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
  const {token}=req.cookies
  console.log(token); 
  try {
    if(token){
      const {id}= verifyToken(token)
      console.log(id);
      const {name,email}=await User.findById(id)
      res.status(200).json({name,email});
    }
    else {
      console.log('ga');
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(500).json({ user: "not user" });
  }
};
module.exports = {
  register,
  login,
  getLoggedInUser
};
