import db from "../orm/models/index.js";

const { Consultation } = db;

export default class ConsultationDAO {
  static async findAllByPatientId(patientId) {
    return await Consultation.findAll({ where: { patientId } });
  }
}
