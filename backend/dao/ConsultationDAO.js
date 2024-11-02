import db from "../orm/models/index.js";
const { Consultation } = db;

export default class ConsultationDAO {
  static async create(data) {
    return await Consultation.create(data);
  }

  static async findAllByPatientId(patientId) {
    return await Consultation.findAll({ where: { patientId } });
  }

  static async deleteById(id) {
    return await Consultation.destroy({ where: { id } });
  }
}
