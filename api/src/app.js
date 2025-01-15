const express = require("express");

//initializations
const app = express();

//settings
app.set("port", process.env.PORT || 5001);

module.exports = app;
