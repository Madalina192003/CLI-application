const fs = require("fs").promises;
const path = require("path");

// Calea către fișierul contacts.json
const contactsPath = path.join(__dirname, "db", "contacts.json");

// Funcție pentru a obține toate contactele
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

// Funcție pentru a obține un contact după ID
async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === String(contactId));
}

// Funcție pentru a adăuga un contact nou
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// Funcție pentru a șterge un contact după ID
async function removeContact(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return contacts.find((contact) => contact.id === String(contactId));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
