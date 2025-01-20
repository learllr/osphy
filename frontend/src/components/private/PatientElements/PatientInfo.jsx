import React, { useRef, useState } from "react";
import axios from "../../../axiosConfig.js";
import { useOnClickOutside } from "../../hooks/useOnClickOutside.js";
import ActivityInfoSection from "./PatientInfoSections/ActivityInfoSection.jsx";
import AntecedentInfoSection from "./PatientInfoSections/AntecedentInfoSection.jsx";
import AppointmentInfoSection from "./PatientInfoSections/AppointmentInfoSection.jsx";
import ContraindicationInfoSection from "./PatientInfoSections/ContraindicationInfoSection.jsx";
import GeneralInfoSection from "./PatientInfoSections/GeneralInfoSection.jsx";
import GynecologyInfoSection from "./PatientInfoSections/GynecologyInfoSection.jsx";
import PregnancyInfoSection from "./PatientInfoSections/PregnancyInfoSection.jsx";
import SleepInfoSection from "./PatientInfoSections/SleepInfoSection.jsx";

export default function PatientInfo({ patient }) {
  const [editingSections, setEditingSections] = useState({});
  const [editedPatient, setEditedPatient] = useState({});
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, () => {
    setEditingSections({});
  });

  const toggleEditSection = (section) => {
    setEditingSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (field, value) => {
    setEditedPatient((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async (section) => {
    try {
      await axios.put(`/patient/${patient.id}`, editedPatient);
      toggleEditSection(section);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div ref={containerRef}>
      <div className="space-y-6">
        <GeneralInfoSection
          patient={patient}
          editedPatient={editedPatient}
          editing={editingSections.generalInfo}
          onToggleEdit={() => toggleEditSection("generalInfo")}
          onSave={() => saveChanges("generalInfo")}
          onInputChange={handleInputChange}
        />

        <AppointmentInfoSection patientId={patient.id} />

        <ActivityInfoSection
          activities={patient.activities}
          editing={editingSections.activities}
          onToggleEdit={() => toggleEditSection("activities")}
        />

        <AntecedentInfoSection antecedents={patient.antecedents} />

        <ContraindicationInfoSection
          contraindications={patient.contraindications}
        />

        <GynecologyInfoSection
          patientGynecology={patient.gynecology}
          editedGynecology={editedPatient.gynecology}
          editing={editingSections.gynecology}
          onToggleEdit={() => toggleEditSection("gynecology")}
          onSave={() => saveChanges("gynecology")}
          onInputChange={handleInputChange}
        />

        <PregnancyInfoSection pregnancies={patient.pregnancies} />

        <SleepInfoSection
          patientSleep={patient.sleep}
          editedSleep={editedPatient.sleep}
          editing={editingSections.sleep}
          onToggleEdit={() => toggleEditSection("sleep")}
          onSave={() => saveChanges("sleep")}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
