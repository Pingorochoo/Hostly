const { Router } = require("express");
const {
  register,
  login,
  getLoggedInUser,
  logout,
} = require("../controllers/user");
const userRouter = Router();

userRouter.get("/me", getLoggedInUser);

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
