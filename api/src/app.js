const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//initializations
const app = express();
dbConnect();
//settings
app.set("port", process.env.PORT || 5001);
//globals
//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:2000",
  })
);
app.use(cookieParser());

//routes
app.use(router);
module.exports = app;
