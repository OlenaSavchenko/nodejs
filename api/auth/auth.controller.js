const {
  Types: { ObjectId },
} = require("mongoose");

const User = require("../users/users.model");
const bcrypt = require("bcrypt");
const { createVerificationToken } = require("../../services/token.service");

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
    await User.createUser({
      email,
      subscription,
      password: hashedPassword,
    });

    res.status(201).json({ email, subscription });
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
    const access_token = await createVerificationToken({ id: user._id });

    res.status(200).json({
      token: access_token,
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

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
