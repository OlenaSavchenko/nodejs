const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: String,

    avatarURL: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("users", userSchema);
  }
  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  findUser = async (query) => {
    return await this.db.findOne(query);
  };

  findUserById = async (userId) => {
    return await this.db.findById(userId);
  };

  updateToken = async (id, newToken) => {
    return await this.db.findByIdAndUpdate(id, {
      token: newToken,
    });
  };

  updateUserData = async (userId, userData) => {
    return await this.db.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
  };
}

module.exports = new User();
