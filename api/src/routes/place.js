const { Router } = require("express");
const { uploadPhotoByUrl, uploadPhotos, createPlace, getUserPlaces } = require("../controllers/place");
const { uploadPhotosMiddleware } = require("../middlwares/upload");
const placeRouter = Router();
placeRouter.post("/photos/url", uploadPhotoByUrl);
placeRouter.post("/photos/upload", uploadPhotosMiddleware,uploadPhotos);
placeRouter.post("/", createPlace);

placeRouter.get("/", getUserPlaces);
module.exports = placeRouter;
