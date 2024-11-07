import db from "../orm/models/index.js";

const { Newsletter } = db;

export default class NewsletterDAO {
    static async create(data) {
        return await Newsletter.create(data);
    }
}