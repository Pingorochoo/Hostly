const { Router } = require("express");
const { register } = require("../controllers/user");
const userRouter = Router();
userRouter.post("/register", register);
module.exports = userRouter;
