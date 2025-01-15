import db from "../orm/models/index.js";

const { User } = db;

export default class AuthentificationDAO {
  static async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async updateUserPassword(userId, hashedPassword) {
    return await User.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );
  }

  static async findUserByIdentifier(identifier) {
    return await User.findOne({ where: { identifier } });
  }
}
