const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { dbConnect } = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const notFound = require("./middlwares/notFound");
const errorHandler = require("./middlwares/errorHandler");
require("dotenv").config();

//initializations
const app = express();
dbConnect();
//settings
app.set("port", process.env.PORT || 5001);
//globals
app.use((req, res, next) => {
  app.locals.uploads = join(__dirname, "public", "uploads");
  next();
});
//middlewares
if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_LAN_URL],
  })
);
app.use(cookieParser());
//routes
app.use(router);

//error handlers
app.use(notFound);
app.use(errorHandler);

//public
app.use(express.static(join(__dirname, "public", "uploads")));

module.exports = app;
