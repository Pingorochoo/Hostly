const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const placeRouter = require("./place");

router.use("/users", userRouter);
router.use("/places", placeRouter);
module.exports = router;
