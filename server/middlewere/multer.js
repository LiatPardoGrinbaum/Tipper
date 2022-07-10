import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileArr = file.originalname.split(".");
    const fileEnd = fileArr[fileArr.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileEnd);
  },
});
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
  storage,
});

export default upload;
