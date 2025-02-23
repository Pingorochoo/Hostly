const download = require("image-downloader");
const { join, parse } = require("path");
const { rename } = require("fs/promises");
const { verifyToken } = require("../config/jwtToken");
const Place = require("../models/Place");
const uploadPhotoByUrl = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const destination = join(req.app.locals.uploads);
    const options = {
      url: imageUrl,
      dest: destination,
    };
    const { filename: filePath } = await download.image(options);
    const { dir, name, ext } = parse(filePath);
    const cleanExt = ext.replace(/\s+/g, "") || ".jpg";
    const newFilename = name + "-" + Date.now() + cleanExt;
    const newFilePath = join(dir, newFilename);
    await rename(filePath, newFilePath);
    res.json(newFilename);
  } catch (error) {
    throw new Error(error);
  }
};
const uploadPhotos = async (req, res) => {
  const files = req.files;
  const filenamamesArray = files.map((file) => file.filename);
  res.json(filenamamesArray);
};
const createPlace = async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  const { id } = verifyToken(token);
  if (id) {
    const placeDoc = await Place.create({
      owener: id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  } else res.status(400).json("Invalid token");
};
const getUserPlaces = async (req, res) => {
  const { token } = req.cookies;
  const { id } = verifyToken(token);
  if (id) {
    const places = await Place.find({ owener: id });
    res.json(places);
  } else res.json("Invalid token");
};
module.exports = {
  uploadPhotoByUrl,
  uploadPhotos,
  createPlace,
  getUserPlaces,
};
