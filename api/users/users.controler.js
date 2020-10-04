const User = require("./users.model");

const getCurrentUserController = async (req, res, next) => {
  try {
    const {
      user: { email, subscription },
    } = req;
    res.status(200).json({ email, subscription });
  } catch (e) {
    next(e);
  }
};

const updateUserSubscriptionController = async (req, res, next) => {
  try {
    const { userId } = req;
    const {
      user: { email, subscription },
    } = req;

    const newSubscriptionValue = req.body.subscription;

    await User.updateUserData(userId, {
      subscription: newSubscriptionValue,
    });
    res.status(200).json({ subscription, email });
  } catch (e) {
    if (e) {
      res.status(400).send("Value of subscription is invalid");
    }
    next(e);
  }
};

const updateAvatarController = async (req, res, next) => {
  try {
    const { userId } = req;
    const {
      user: { avatarURL },
    } = req;

    const {
      file: { filename },
    } = req;

    const file = req.file;
    const newAvatarUrl = `http://localhost:3000/images/${filename}`;
    await User.updateUserData(userId, {
      avatarURL: newAvatarUrl,
    });
    res.status(200).send(newAvatarUrl);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUserController,
  updateUserSubscriptionController,
  updateAvatarController,
};
