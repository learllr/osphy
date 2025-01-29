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
          attributes: ["firstName", "lastName", "birthDate", "gender"],
        },
      ],
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });
  }

  static async getAppointmentsByPatientId(patientId) {
    return await Appointment.findAll({
      where: { patientId },
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["firstName", "lastName", "birthDate", "gender"],
        },
      ],
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });
  }

  static async createAppointment(appointmentData) {
    return await Appointment.create({
      userId: appointmentData.userId,
      patientId: appointmentData.patientId,
      type: appointmentData.type,
      date: appointmentData.date,
      startTime: appointmentData.startTime,
      endTime: appointmentData.endTime,
      status: appointmentData.status || "En attente",
      comment: appointmentData.comment,
    });
  }

  static async updateAppointment(id, appointmentData) {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return null;
    }

    await appointment.update({
      date: appointmentData.date,
      startTime: appointmentData.startTime,
      endTime: appointmentData.endTime,
      status: appointmentData.status,
      comment: appointmentData.comment,
    });

    return appointment;
  }

  static async deleteAppointment(id) {
    const appointment = await db.Appointment.findByPk(id);

    if (!appointment) {
      return null;
    }

    await appointment.destroy();
    return true;
  }
}
