const download = require("image-downloader");
const { join, parse } = require("path");
const { rename } = require("fs/promises");
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
module.exports = {
  uploadPhotoByUrl,
  uploadPhotos,
};
