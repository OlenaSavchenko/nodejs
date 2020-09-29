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

module.exports = {
  getCurrentUserController,
};
