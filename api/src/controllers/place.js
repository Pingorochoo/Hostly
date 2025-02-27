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
    photos,
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
  if (!id) return res.status(400).json("Invalid token");
  const placeDoc = await Place.create({
    owener: id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  });
  res.json(placeDoc);
};
const getUserPlaces = async (req, res) => {
  const { token } = req.cookies;
  const { id } = verifyToken(token);
  if (id) {
    const places = await Place.find({ owener: id });
    res.json(places);
  } else res.json("Invalid token");
};
const getPlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id, { _id: 0, __v: 0, owener: 0 });
  if (!id) return res.status(400).json("Invalid id");
  //if(!place)return res.status(400).json("Place not found")
  return res.json(place);
};

const updatePlace = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { id: loggedUserId } = verifyToken(token);
  const place = await Place.findByIdAndUpdate(id, req.body, { new: true });
  if (place.owener.toString() !== loggedUserId)
    return res.status(400).json("You are not the owner of this place");
  res.json(place);
};
module.exports = {
  uploadPhotoByUrl,
  uploadPhotos,
  createPlace,
  getUserPlaces,
  getPlace,
  updatePlace,
};
