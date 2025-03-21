const multer = require("multer");
const { parse } = require("path");
const memoryStorage = multer.memoryStorage();
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.app.locals.uploads);
  },
  filename: function (req, file, cb) {
    const { name, ext } = parse(file.originalname);
    const newFilemame = name + "-" + Date.now() + ext;
    cb(null, newFilemame);
  },
});
const storage = memoryStorage;
function fileFilter(req, file, cb) {
  if (file.mimetype?.includes("image/")) {
    cb(null, true);
  } else {
    req.fileTypeError = "file must be an image";
    cb(null, false);
  }
}
const limits = { fileSize: 10 * 1024 * 1024 };
const upload = multer({
  storage,
  limits,
  fileFilter,
});
const uploadLimit = 25;
const uploader = upload.array("photos", uploadLimit);

const uploadPhotosMiddleware = (req, res, next) => {
  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE")
        return res
          .status(400)
          .json({ message: `Maximum ${uploadLimit} photos allowed` });
      return res.status(400).json({ message: err.code });
    }
    if (req.fileTypeError)
      return res.status(400).json({ message: req.fileTypeError });
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

module.exports = {
  uploadPhotosMiddleware,
};
