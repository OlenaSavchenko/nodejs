const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "NoName",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    subscription: {
      type: String,
      required: true,
      default: "free",
    },
  },
  { versionKey: false }
);

class Contact {
  constructor() {
    this.db = mongoose.model("Contacts", contactSchema);
  }
  getContacts = async () => {
    return await this.db.find();
  };

  createContact = async (contactData) => {
    return await this.db.create(contactData);
  };

  updateContact = async (contactId, contactData) => {
    return await this.db.findByIdAndUpdate(contactId, contactData, {
      new: true,
    });
  };

  deleteContact = async (contactId) => {
    return await this.db.findByIdAndRemove(contactId);
  };
}

module.exports = new Contact();
