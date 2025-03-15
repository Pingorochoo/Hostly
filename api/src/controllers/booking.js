const { verifyToken } = require("../config/jwtToken");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const { token } = req.cookies;
  const { id } = verifyToken(token);
  if (!id) return res.status(400).json("invalid accestoken");
  const { placeId, checkInDate, checkOutDate, guests } = req.body;
  const booking = await Booking.create({
    place: placeId,
    checkInDate,
    checkOutDate,
    guests,
    bookedBy: id,
  });
  res.json(booking);
};
const getBookingsByUser = async (req, res) => {
  const { token } = req.cookies;
  const { id } = verifyToken(token);
  if (!id) res.status(400).json("invalid accestoken");
  const bookingsByUser = await Booking.find({ bookedBy: id }, { __v: 0 }).populate('place');
  res.json(bookingsByUser);
};
module.exports = {
  createBooking,
  getBookingsByUser,
};
