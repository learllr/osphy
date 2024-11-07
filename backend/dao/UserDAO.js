import db from "../orm/models/index.js";
const { User } = db;

export default class UserDAO {
  static async getUserById(id) {
    return await User.findByPk(id);
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async create(userData) {
    return await User.create(userData);
  }

  static async update(user, updatedData) {
    return await user.update(updatedData);
  }

  static async delete(user) {
    return await user.destroy();
  }
}
