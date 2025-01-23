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
  const { patientId, type, date, startTime, endTime, status } = req.body;
  const userId = req.user.id;

  try {
    const newAppointment = await AppointmentDAO.createAppointment({
      userId,
      patientId,
      type,
      date,
      startTime,
      endTime,
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

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, startTime, endTime, status, comment } = req.body;

  try {
    const updatedAppointment = await AppointmentDAO.updateAppointment(id, {
      date,
      startTime,
      endTime,
      status,
      comment,
    });

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Rendez-vous non trouvé." });
    }

    res.status(200).json({ message: "Rendez-vous mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du rendez-vous." });
  }
};
