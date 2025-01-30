const { Router } = require("express");
const { uploadPhotoByUrl } = require("../controllers/place");
const placeRouter = Router();
placeRouter.post("/photos/url", uploadPhotoByUrl);
module.exports = placeRouter;
