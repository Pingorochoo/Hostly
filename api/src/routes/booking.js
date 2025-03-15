const { Router } = require("express");
const { createBooking, getBookingsByUser } = require("../controllers/booking");
const bookingRouter = Router();
bookingRouter.post("/", createBooking);
bookingRouter.get("/user", getBookingsByUser);
module.exports = bookingRouter;
