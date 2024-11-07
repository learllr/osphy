import db from "../orm/models/index.js";
const { Consultation } = db;

export default class ConsultationDAO {
  static async create(consultationData) {
    return await Consultation.create(consultationData);
  }

  static async findAllByPatientId(patientId) {
    return await Consultation.findAll({ where: { patientId } });
  }

  static async deleteById(consultationId) {
    return await Consultation.destroy({ where: { consultationId } });
  }
}
