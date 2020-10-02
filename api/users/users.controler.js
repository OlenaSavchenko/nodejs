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

    await User.updateUserSubscription(userId, {
      subscription: newSubscriptionValue,
    });
    res.status(200).json({ subscription, email });
  } catch (e) {
    if (e) {
      res.send("Value of subscription is invalid");
    }
    next(e);
  }
};

module.exports = {
  getCurrentUserController,
  updateUserSubscriptionController,
};
