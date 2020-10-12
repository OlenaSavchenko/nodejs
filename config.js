const AvatarGenerator = require("avatar-generator");
const PORT = process.env.PORT || 3000;
const HOST = "http://localhost:";
const imagesPath = "public/images";
const sgMail = require("@sendgrid/mail");

const avatar = new AvatarGenerator({
  parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"], //order in which sprites should be combined
  partsLocation: "../nodejs/node_modules/avatar-generator/img", // path to sprites
  imageExtension: ".png", // sprite file extension
});

const generateAvatarPath = (id) => `./${imagesPath}/${id}.png`;
const generateAvatarUrl = (id) => `${HOST}${PORT}/images/${id}.png`;
const generateNewAvatarUrl = (name) => `${HOST}${PORT}/images/${name}`;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (verificationToken) => {
  const msg = {
    to: "olsavchenko1@gmail.com", // Change to your recipient
    from: "olsavchenko1@gmail.com", // Change to your verified sender
    subject: "Your verification token",
    text: "Your verification token:",
    html: `http://localhost:3000/auth/verify/${verificationToken}`,
  };
  return await sgMail.send(msg);
};

module.exports = {
  avatar,
  PORT,
  HOST,
  imagesPath,
  generateAvatarPath,
  generateAvatarUrl,
  generateNewAvatarUrl,
  sendVerificationEmail,
};
