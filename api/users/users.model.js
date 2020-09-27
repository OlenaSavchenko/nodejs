const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("users", userSchema);
  }
  createUser = async (userData) => {
    console.log("createUser", userData);
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
}

module.exports = new User();
