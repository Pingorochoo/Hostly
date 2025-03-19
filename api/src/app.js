const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const { join } = require("path");
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
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:2000", "http://192.168.0.236:2000"],
  })
);
app.use(cookieParser());
//routes
app.use(router);

//public
app.use(express.static(join(__dirname, "public", "uploads")));

module.exports = app;
