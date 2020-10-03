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
      default: "",
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
    this.db = mongoose.model("contacts", contactSchema);
  }

  getContacts = async (query) => {
    const { limit, page, sub, sort, ...otherQuery } = query;
    const skipItems = (page - 1) * limit;
    const subObject = sub
      ? {
          subscription: sub,
        }
      : {};

    return await this.db
      .find({
        ...otherQuery,
        ...subObject,
      })
      .skip(skipItems)
      .limit(Number(limit))
      .sort({ name: 1 });
  };

  getContactById = async (contactId) => {
    return await this.db.findById(contactId);
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
