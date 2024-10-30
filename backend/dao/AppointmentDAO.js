import db from "../orm/models/index.js";

const { Appointment, Patient } = db;

export default class AppointmentDAO {
  static async getAppointmentsByUserId(userId) {
    return await Appointment.findAll({
      where: { userId },
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
  }

  static async createAppointment(appointmentData) {
    return await Appointment.create(appointmentData);
  }
}
