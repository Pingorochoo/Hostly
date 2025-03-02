const { Router } = require("express");
const {
  uploadPhotoByUrl,
  uploadPhotos,
  createPlace,
  getUserPlaces,
  getPlace,
  updatePlace,
  getPlaces,
} = require("../controllers/place");
const { uploadPhotosMiddleware } = require("../middlwares/upload");
const placeRouter = Router();
placeRouter.post("/photos/url", uploadPhotoByUrl);
placeRouter.post("/photos/upload", uploadPhotosMiddleware, uploadPhotos);
placeRouter.post("/", createPlace);

placeRouter.get("/", getPlaces);
placeRouter.get("/user", getUserPlaces);
placeRouter.get("/:id", getPlace);

placeRouter.put("/:id", updatePlace);
module.exports = placeRouter;
