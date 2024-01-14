const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      // console.log("Contacts list:", contacts);
      break;

    case "get":
      getContactById(id).then((contact) =>
        console.log(contact || "Contact not found"),
      );
      break;

    case "add":
      addContact(name, email, phone).then(console.log);
      break;

    case "remove":
      removeContact(id).then((contact) =>
        console.log(contact || "Contact not found"),
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
