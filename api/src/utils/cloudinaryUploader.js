const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const configuration = {
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
cloudinary.config(configuration);

const transformations = [
  {
    width: 1920,
    height: 1080,
    crop: "limit",
    quality: "auto",
    fetch_format: "auto",
  },
];
const options = {
  folder: process.env.CLOUDINARY_FOLDER,
  transformation: transformations,
};
const cloudinaryUploader = async (images) => {
  try {
    if (Array.isArray(images))
      return await Promise.all(
        images.map(async (image) => {
          const { secure_url, public_id } = await cloudinary.uploader.upload(
            image,
            options
          );
          return { secure_url, public_id };
        })
      );
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      images,
      options
    );
    return { secure_url, public_id };
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    throw error;
  }
};
//return true if all images are deleted
const cloudinaryRemover = async (publicIds) => {
  publicIds = Array.isArray(publicIds) ? publicIds : [publicIds];
  try {
    const { deleted } = await cloudinary.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "image",
    });
    return Object.values(deleted).every((value) => value === "deleted");
  } catch (error) {
    console.error("Error removing images from Cloudinary:", error);
    throw error;
  }
};
module.exports = {
  cloudinaryUploader,
  cloudinaryRemover,
};
