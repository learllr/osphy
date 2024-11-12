import db from "../orm/models/index.js";

const { Newsletter } = db;

export default class NewsletterDAO {
    static async createNewsletter(newsletterData) {
        return await Newsletter.create(newsletterData);
    }
}