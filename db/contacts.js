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
  const result = await contactsData.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(result));
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

  await contactsData.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsData));
  await fs.readFile(contactsPath, { encoding: "utf-8" });
   return newContact
}

async function updateContact(id, body) {
  const contact = await getContactById(id);
  const updatedContact = { ...contact, ...body };

  const contactsList = await listContacts();
  const newContactsList = contactsList.map((contact) => {
    if (contact.id === id) return updatedContact;
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
