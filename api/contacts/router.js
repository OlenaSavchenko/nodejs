const { Router } = require("express");
const Contacts = require("../../db/contacts");

const contactsRouter = Router();

contactsRouter.get("/", async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.json(contacts);
});

contactsRouter.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const parsedId = Number(contactId);
  const contact = await Contacts.getContactById(parsedId);

  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(400).json({ message: "Not found" });
});

contactsRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    name.length &&
    email.length &&
    phone.length
  ) {
    const contact = await Contacts.addContact(name, email, phone);
    res.status(201).json(contact);
    return;
  }
  res.status(400).json({ message: "missing required name field" });
});

contactsRouter.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const parsedId = Number(contactId);
  const contact = await Contacts.getContactById(parsedId);
  if (contact) {
    await Contacts.removeContact(parsedId);
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(400).json({ message: "Not found" });
});

contactsRouter.patch("/:contactId", async (req, res) => {
  const { body } = req;
  if (!body) return res.status(400).json({ message: "missing field" });
  const { contactId } = req.params;
  const parsedId = Number(contactId);
  const contact = await Contacts.getContactById(parsedId);
  if (!contact) return res.status(404).json({ message: "Not found" });

  const updatedContact = await Contacts.updateContact(parsedId, body);

  res.status(200).json(updatedContact);
});



module.exports = contactsRouter;
