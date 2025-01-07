import db from "../orm/models/index.js";
const { Consultation } = db;

export default class ConsultationDAO {
  static async createConsultation(consultationData) {
    return await Consultation.create(consultationData);
  }

  static async findAllConsultationByPatientId(patientId) {
    return await Consultation.findAll({ where: { patientId } });
  }

  static async deleteConsultationById(consultationId) {
    return await Consultation.destroy({ where: { id: consultationId } });
  }

  static async updateConsultationById(consultationId, updatedData) {
    const [rowsUpdated] = await Consultation.update(updatedData, {
      where: { id: consultationId },
    });

    return rowsUpdated > 0;
  }
}
