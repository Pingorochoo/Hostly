const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  checkInDate: {
    type: Date,
    require: true,
  },
  checkOutDate: {
    type: Date,
    require: true,
  },
  guests: {
    type: Number,
    require: true,
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Booking", bookingSchema);
