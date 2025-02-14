const { Router } = require("express");
const { uploadPhotoByUrl, uploadPhotos } = require("../controllers/place");
const { uploadPhotosMiddleware } = require("../middlwares/upload");
const placeRouter = Router();
placeRouter.post("/photos/url", uploadPhotoByUrl);
placeRouter.post("/photos/upload", uploadPhotosMiddleware,uploadPhotos);
module.exports = placeRouter;
