import db from "../orm/models/index.js";

const { User } = db;

export default class AuthentificationDAO {
  static async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}
