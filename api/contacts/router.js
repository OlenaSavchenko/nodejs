const { Router } = require("express");

const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  getContactByIdController,
} = require("./contacts.controller");

const { checkAuthTokenMiddleware } = require("../middlewares/auth.middlewares");

const contactsRouter = Router();

contactsRouter.get("/", checkAuthTokenMiddleware, getContactsController);
contactsRouter.get("/", checkAuthTokenMiddleware, getContactByIdController);
contactsRouter.post("/", checkAuthTokenMiddleware, createContactController);
contactsRouter.patch("/", checkAuthTokenMiddleware, updateContactController);
contactsRouter.delete(
  "/:contactId",
  checkAuthTokenMiddleware,
  deleteContactController
);

module.exports = contactsRouter;
