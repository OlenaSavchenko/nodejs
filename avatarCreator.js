const AvatarGenerator = require("avatar-generator");

const avatar = new AvatarGenerator({
  parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"], //order in which sprites should be combined
  partsLocation: "../nodejs/node_modules/avatar-generator/img", // path to sprites
  imageExtension: ".png", // sprite file extension
});

module.exports = { avatar };
