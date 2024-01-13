const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    console.log(readResult);
    return JSON.parse(readResult);
  } catch (err) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) return null;

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId,
    );
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
    );
    return removedContact;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fsPromises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);

    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
