const { Router } = require("express");
const { register, login, getLoggedInUser } = require("../controllers/user");
const userRouter = Router();

userRouter.get("/me",getLoggedInUser)

userRouter.post("/register", register);
userRouter.post("/login",login)

module.exports = userRouter;
