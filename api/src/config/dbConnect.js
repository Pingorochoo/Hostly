const mongoose = require("mongoose");
mongoose.connection.once("open", () => {
  console.log(`Database connected to ${mongoose.connection.host}`);
});
mongoose.connection.on("error", (error) => {
  throw new Error(`Database connection error: ${error.message}`);
});
const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = dbConnect;
