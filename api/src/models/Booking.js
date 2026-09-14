const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Booking", bookingSchema);
