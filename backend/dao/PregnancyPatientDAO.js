import db from "../orm/models/index.js";

const { PatientPregnancy } = db;

export default class PregnancyPatientDAO {
  static async findPregnanciesByPatientId(patientId) {
    return await PatientPregnancy.findAll({
      where: { patientId },
      attributes: ["id", "gender", "deliveryMethod", "epidural"],
    });
  }

  static async createPregnancy(pregnancyData) {
    const pregnancy = await PatientPregnancy.create(pregnancyData);

    return await PatientPregnancy.findOne({
      where: { id: pregnancy.id },
      attributes: ["id", "gender", "deliveryMethod", "epidural"],
    });
  }

  static async updatePregnancy(pregnancyId, updatedData) {
    const [updatedCount] = await PatientPregnancy.update(updatedData, {
      where: { id: pregnancyId },
    });

    if (updatedCount === 0) {
      console.error("Aucune ligne mise à jour !");
      return null;
    }

    return await PatientPregnancy.findOne({
      where: { id: pregnancyId },
      attributes: ["id", "gender", "deliveryMethod", "epidural"],
    });
  }

  static async deletePregnancy(pregnancyId) {
    return await PatientPregnancy.destroy({
      where: { id: pregnancyId },
    });
  }
}
