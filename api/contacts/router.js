const { Router } = require("express");

const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require("./contacts.controller");

const contactsRouter = Router();

contactsRouter.get("/", getContactsController);
contactsRouter.post("/", createContactController);
contactsRouter.patch("/", updateContactController);
contactsRouter.delete("/:contactId", deleteContactController);

module.exports = contactsRouter;