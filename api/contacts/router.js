const { Router } = require("express");

const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  getContactByIdController,
} = require("./contacts.controller");

const contactsRouter = Router();

contactsRouter.get("/", getContactsController);
contactsRouter.get("/", getContactByIdController);
contactsRouter.post("/", createContactController);
contactsRouter.patch("/", updateContactController);
contactsRouter.delete("/:contactId", deleteContactController);

module.exports = contactsRouter;
