const download = require("image-downloader");
const { join, parse } = require("path");
const { rename } = require("fs/promises");

const downloadImage = async (url,destination) => {
  try {
    const { filename: filePath } = await download.image({
      url,
      dest: destination,
    });
    const { dir, name, ext } = parse(filePath);
    const cleanExt = ext.replace(/\s+/g, "") || ".jpg";
    const newFilename = name + "-" + Date.now() + cleanExt;
    const newFilePath = join(dir, newFilename);
    await rename(filePath, newFilePath);
    return newFilename;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { downloadImage };