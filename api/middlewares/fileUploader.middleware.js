const multer = require("multer");

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      const fileType = file.mimetype.split("/")[1];
      if (fileType !== "png" && fileType !== "jpeg" && fileType !== "jpg") {
        return cb(new Error("Invalid avatar extension"));
      }
      cb(null, `${req.userId}.${fileType}`);
    },
  });
  return multer({ storage: storage }).single("avatar");
};

module.exports = {
  avatarUploaderMiddleware: avatarUploader(),
};
