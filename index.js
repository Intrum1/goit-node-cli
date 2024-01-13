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
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.log("Contacts list:", contacts);
        break;

      case "get":
        if (!id) {
          console.error("Please provide an ID for the 'get' action.");
          break;
        }
        const contactById = await getContactById(id);
        if (contactById) {
          console.log("Contact by ID:", contactById);
        } else {
          console.log("Contact not found");
        }
        break;

      case "add":
        if (!name || !email || !phone) {
          console.error(
            "Please provide name, email, and phone for the 'add' action.",
          );
          break;
        }
        const addedContact = await addContact(name, email, phone);
        console.log("Contact added:", addedContact);
        break;

      case "remove":
        if (!id) {
          console.error("Please provide an ID for the 'remove' action.");
          break;
        }
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log("Contact removed:", removedContact);
        } else {
          console.log("Contact not found");
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

invokeAction(options);
