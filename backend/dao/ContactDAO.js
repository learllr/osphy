import db from "../orm/models/index.js";

const { Contact } = db;

export default class ContactDAO {
    static async createContact(contactData) {
        return await Contact.create(contactData);
    }
}
