const { verifyToken } = require("../config/jwtToken");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const { token } = req.cookies;
  const { id } = verifyToken(token);
  if (!id) return res.status(400).json("invalid acces token");
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
module.exports = {
  createBooking,
};
