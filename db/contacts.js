const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function listContacts() {
  const contactsData = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contactsData);
}

async function getContactById(contactId) {
  const contactsData = await listContacts();
  return contactsData.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contactsData = await listContacts();
  const result = contactsData.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(result));
  return fs.readFile(contactsPath, { encoding: "utf-8" });
}

async function addContact(name, email, phone) {
  const contactsData = await listContacts();
  const id = contactsData.length ? [...contactsData].pop().id + 1 : 1;
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  contactsData.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsData));
  return fs.readFile(contactsPath, { encoding: "utf-8" });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
