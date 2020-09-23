const ContactDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const { query } = req;
    const contacts = await ContactDB.getContacts(query);
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await ContactDB.createContact(body);
    res.status(201).json(newContact);
  } catch (e) {
    console.log("Error message:", e);
    next(e);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updatedContact = await ContactDB.updateContact(id, data);
    res.status(200).json(updatedContact);
  } catch (e) {
    console.log("Error message:", e);
    next(e);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deleteContact = await ContactDB.deleteContact(contactId);
    res.end();
  } catch (e) {
    console.log("Error message:", e);
    next(e);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await ContactDB.getContactById(contactId);
    res.json(contact);
  } catch (e) {
    console.log("Error message:", e);
    next(e);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
};
