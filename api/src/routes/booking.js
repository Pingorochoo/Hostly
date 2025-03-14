const { Router } = require("express");
const { createBooking } = require("../controllers/booking");
const bookingRouter = Router();
bookingRouter.post("/", createBooking);
module.exports = bookingRouter;
