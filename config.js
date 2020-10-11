const AvatarGenerator = require("avatar-generator");
const PORT = process.env.PORT || 3000;
const HOST = "http://localhost:";
const imagesPath = "public/images";

const avatar = new AvatarGenerator({
  parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"], //order in which sprites should be combined
  partsLocation: "../nodejs/node_modules/avatar-generator/img", // path to sprites
  imageExtension: ".png", // sprite file extension
});

const generateAvatarPath = (id) => `./${imagesPath}/${id}.png`;
const generateAvatarUrl = (id) => `${HOST}${PORT}/images/${id}.png`;
const generateNewAvatarUrl = (name) => `${HOST}${PORT}/images/${name}`;

module.exports = {
  avatar,
  PORT,
  HOST,
  imagesPath,
  generateAvatarPath,
  generateAvatarUrl,
  generateNewAvatarUrl,
};
