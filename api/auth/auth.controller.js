const {
  Types: { ObjectId },
} = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const User = require("../users/users.model");

const { createVerificationToken } = require("../../services/token.service");
const {
  avatar,
  generateAvatarPath,
  generateAvatarUrl,
} = require("../../config");

const { sendVerificationEmail } = require("../../services/email.service");

const registrationController = async (req, res, next) => {
  try {
    const { password, email, subscription } = req.body;
    const user = await User.findUser({ email });
    if (user) {
      return res.status(409).send("Email in use");
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    const avatarId = Date.now();
    const variant = "female";
    const image = await avatar.generate("email@example.com", variant);
    const savedAvatar = await image.png().toFile(generateAvatarPath(avatarId));
    const avatarURL = generateAvatarUrl(avatarId);

    const verificationToken = uuid.v4();

    await User.createUser({
      email,
      subscription,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });

    sendVerificationEmail(verificationToken);

    res.status(201).json({ email, subscription, avatarURL });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUser({ email });

    if (!user) {
      return res.status(401).send("Email is wrong");
    }
    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      return res.status(401).send("Password is wrong");
    }
    const accessToken = await createVerificationToken({ id: user._id });

    res.status(200).json({
      token: accessToken,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (e) {
    next(e);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { _id } = req.body;
    if (!ObjectId.isValid(_id)) {
      return res.status(400).send();
    }
    const user = await User.findUserById(_id);
    if (!user) {
      return res.status(401).send("Not authorized");
    }
    await User.updateToken(user._id, null);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

const checkVerificationToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findUser({ verificationToken });
    if (!user) {
      return res.status(404).send("User not found");
    }

    await User.updateUserData(user._id, {
      verificationToken: null,
    });
    return res.status(200).send("Succes");
  } catch (e) {
    next(e);
  }
};
module.exports = {
  registrationController,
  loginController,
  logoutController,
  checkVerificationToken,
};
