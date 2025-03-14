const { Router } = require("express");
const router = Router();
const userRouter = require("./user");
const placeRouter = require("./place");
const bookingRouter = require("./booking");

router.use("/users", userRouter);
router.use("/places", placeRouter);
router.use("/booking", bookingRouter);
module.exports = router;
