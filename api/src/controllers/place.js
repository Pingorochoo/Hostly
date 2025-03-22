const { verifyToken } = require("../config/jwtToken");
const { asyncHandler } = require("../middlwares/asyncHandler");
const Place = require("../models/Place");
const {
  cloudinaryUploader,
  cloudinaryRemover,
} = require("../utils/cloudinaryUploader");

const uploadPhotoByUrl = async (req, res) => {
  const { imageUrl } = req.body;
  const { secure_url, public_id } = await cloudinaryUploader(imageUrl);
  res.json({ secure_url, public_id });
};

const uploadPhotos = async (req, res) => {
  const files = req.files;
  const imagesURIs = [];
  for (const file of files) {
    const base64String = file.buffer.toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64String}`;
    imagesURIs.push(dataURI);
  }
  const images = await cloudinaryUploader(imagesURIs);
  res.json(images);
};

const cancelCreatePlace = async (req, res) => {
  const { photosToRemove } = req.body;
  if (photosToRemove.length === 0)
    return res.json({ message: "No images to delete" });
  const response = await cloudinaryRemover(
    photosToRemove.map((pic) => pic.public_id)
  );
  if (response) return res.json({ message: "Images deleted successfully" });
  return res.status(400).json({ message: "Failed to delete images" });
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
    owner: id,
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
    const places = await Place.find({ owner: id }, { __v: 0 });
    res.json(places);
  } else res.json("Invalid token");
};

const getPlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id, { __v: 0, owner: 0 });
  if (!id) return res.status(400).json("Invalid id");
  return res.json(place);
};

const updatePlace = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const { id: loggedUserId } = verifyToken(token);
  const place = await Place.findByIdAndUpdate(id, req.body, { new: true });
  if (place.owner.toString() !== loggedUserId)
    return res.status(400).json("You are not the owner of this place");
  res.json(place);
};

const getPlaces = async (req, res) => {
  const places = await Place.find({}, { __v: 0 });
  res.json(places);
};

module.exports = {
  uploadPhotoByUrl: asyncHandler(uploadPhotoByUrl),
  uploadPhotos: asyncHandler(uploadPhotos),
  createPlace: asyncHandler(createPlace),
  getUserPlaces: asyncHandler(getUserPlaces),
  getPlace: asyncHandler(getPlace),
  updatePlace: asyncHandler(updatePlace),
  getPlaces: asyncHandler(getPlaces),
  cancelCreatePlace: asyncHandler(cancelCreatePlace),
};
