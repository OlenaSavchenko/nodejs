const contacts = require("./db/contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((result) => console.table(result));

      break;

    case "get":
      contacts.getContactById(id).then((result) => console.log(result));
      break;

    case "add":
      contacts
        .addContact(name, email, phone)
        .then((result) => console.table(result));

      break;

    case "remove":
      contacts.removeContact(id).then((result) => console.table(result));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
