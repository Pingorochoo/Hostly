const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Place = require("../models/Place");
const Booking = require("../models/Booking");
const {
  dbConnect,
  closeConnection,
  dropDataBase,
} = require("../config/dbConnect");

dbConnect();

async function seedDB() {
  dropDataBase();

  // create users
  const users = [];
  const userDoc = await User.create({
    name: "pingorocho",
    email: "pingorocho@pingorocho",
    password: "pingorocho",
  });
  users.push(userDoc);
  for (let i = 0; i < 4; i++) {
    const password = "test";

    const userDoc = await User.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    });
    users.push(userDoc);
  }

  // create places
  const places = [];
  for (let i = 0; i < 30; i++) {
    const owner =
      i < 7 ? users[0] : users[Math.trunc(Math.random() * users.length)];
    const photos = [];
    for (let j = 0; j < 8; j++) {
      photos.push({
        secure_url: faker.image.urlPicsumPhotos(),
        public_id: faker.string.uuid(),
      });
    }
    const place = new Place({
      owner: owner._id,
      title: faker.company.name(),
      address: faker.location.streetAddress(),
      photos,
      description: faker.lorem.paragraph(),
      perks: faker.helpers.arrayElements([
        "Wifi",
        "free parking spot",
        "TV",
        "Radio",
        "Pets",
        "Private entrance",
        "Air conditioning",
      ]),
      extraInfo: faker.lorem.sentence(),
      checkIn: faker.number.int({ min: 0, max: 23 }),
      checkOut: faker.number.int({ min: 0, max: 23 }),
      maxGuests: faker.number.int({ min: 1, max: 10 }),
      price: faker.number.int({ min: 10, max: 300 }),
    });
    await place.save();
    places.push(place);
  }

  // create bookings
  const bookings = [];
  for (let i = 0; i < 30; i++) {
    const user =
      i < 7 ? users[0] : users[Math.trunc(Math.random() * users.length)];
    const place = places[Math.trunc(Math.random() * places.length)];

    const checkInDate = faker.date.soon();
    const checkOutDate = faker.date.soon({ days: 21, refDate: checkInDate });

    const booking = new Booking({
      place: place._id,
      bookedBy: user._id,
      guests: faker.number.int({ min: 1, max: place.maxGuests }),
      checkInDate,
      checkOutDate,
    });

    await booking.save();
    bookings.push(booking);
  }
  
  console.log("Seed completa ✅");
  closeConnection();
}

seedDB();