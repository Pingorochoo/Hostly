const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connection.once("open", () => {
  console.log(`Database connected to ${mongoose.connection.host}`);
});
mongoose.connection.on("error", (error) => {
  throw new Error(`Database connection error: ${error.message}`);
});
const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
const closeConnection = async () => {
  await mongoose.connection.close();
};
const dropDataBase = async () => {
  await mongoose.connection.dropDatabase();
};
module.exports = { dbConnect, closeConnection, dropDataBase };
