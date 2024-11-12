import AppointmentDAO from "../dao/AppointmentDAO.js";

export const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await AppointmentDAO.getAppointmentsByUserId(userId);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des rendez-vous." });
  }
};

export const getAppointmentsByPatientId = async (req, res) => {
  const { id } = req.params;

  try {
    const appointments = await AppointmentDAO.getAppointmentsByPatientId(id);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des rendez-vous pour le patient:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des rendez-vous du patient.",
    });
  }
};

export const createAppointment = async (req, res) => {
  const { patientId, start, end, status } = req.body;
  const userId = req.user.id;

  try {
    const newAppointment = await AppointmentDAO.createAppointment({
      userId,
      patientId,
      start,
      end,
      status: status || "En attente",
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création du rendez-vous." });
  }
};
