import db from "../orm/models/index.js";
const { UserSetting } = db;

class UserSettingDAO {
  static async getUserSettingByUserId(userId) {
    return await UserSetting.findOne({ where: { userId } });
  }

  static async create(settingData) {
    return await UserSetting.create(settingData);
  }

  static async update(userId, settings) {
    const setting = await UserSetting.findOne({ where: { userId } });
    if (!setting) return null;

    Object.keys(settings).forEach((key) => {
      if (setting[key] !== undefined) {
        setting[key] = settings[key];
      }
    });

    await setting.save();
    return setting;
  }
}

export default UserSettingDAO;
