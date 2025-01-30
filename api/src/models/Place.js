const { Schema, model } = require("mongoose");

var placeSchema = new Schema({
  owener: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

module.exports = model("Place", placeSchema);
