import db from "../orm/models/index.js";

const { Consultation } = db;

export default class DiagnosisDAO {
  static async createDiagnosis(consultationId, diagnosisData) {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) return null;

    consultation.diagnosis = diagnosisData;
    await consultation.save();
    return consultation;
  }

  static async updateDiagnosis(consultationId, diagnosisData) {
    const [updatedRows] = await Consultation.update(
      { diagnosis: diagnosisData },
      { where: { id: consultationId } }
    );
    return updatedRows > 0;
  }

  static async deleteDiagnosis(consultationId) {
    const [updatedRows] = await Consultation.update(
      { diagnosis: null },
      { where: { id: consultationId } }
    );
    return updatedRows > 0;
  }
}
