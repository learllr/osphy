import PatientDAO from "../dao/PatientDAO.js";

export const getAllPatients = async (req, res) => {
  try {
    const userId = req.user.id;
    const patients = await PatientDAO.findAllPatientsByUserId(userId);
    res.status(200).json(patients);
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des patients." });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const patient = await PatientDAO.findPatientByIdAndUserId(id, userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du patient." });
  }
};

export const createPatient = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
    } = req.body;

    const newPatient = await PatientDAO.createPatient({
      userId,
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error);
    res.status(500).json({ message: "Erreur lors de la création du patient." });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const {
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
    } = req.body;

    const patient = await PatientDAO.findPatientByIdAndUserId(id, userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    const updatedPatient = await PatientDAO.updatePatient(patient, {
      gender,
      lastName,
      firstName,
      birthDate,
      address,
      postalCode,
      city,
      mobilePhone,
      email,
      occupation,
    });

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du patient." });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const patient = await PatientDAO.findPatientByIdAndUserId(id, userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé." });
    }

    await PatientDAO.deletePatient(patient);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du patient." });
  }
};
