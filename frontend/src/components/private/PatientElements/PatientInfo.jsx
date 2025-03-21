import React from "react";
import ActivityInfoSection from "./PatientInfoSections/ActivityInfoSection.jsx";
import AntecedentInfoSection from "./PatientInfoSections/AntecedentInfoSection.jsx";
import AppointmentInfoSection from "./PatientInfoSections/AppointmentInfoSection.jsx";
import ContraindicationInfoSection from "./PatientInfoSections/ContraindicationInfoSection.jsx";
import GeneralInfoSection from "./PatientInfoSections/GeneralInfoSection.jsx";
import GynecologyInfoSection from "./PatientInfoSections/GynecologyInfoSection.jsx";
import PregnancyInfoSection from "./PatientInfoSections/PregnancyInfoSection.jsx";
import SleepInfoSection from "./PatientInfoSections/SleepInfoSection.jsx";

export default function PatientInfo({ patient, activeSubTab }) {
  return (
    <div>
      {activeSubTab === "general" && <GeneralInfoSection patient={patient} />}

      {activeSubTab === "activites" && (
        <ActivityInfoSection
          patientId={patient.id}
          activities={patient.activities}
        />
      )}

      {activeSubTab === "antecedents" && (
        <AntecedentInfoSection
          patientId={patient.id}
          antecedents={patient.antecedents}
        />
      )}

      {activeSubTab === "contre-indications" && (
        <ContraindicationInfoSection
          patientId={patient.id}
          contraindications={patient.contraindications}
        />
      )}

      {activeSubTab === "gynecologie" && (
        <GynecologyInfoSection
          patientId={patient.id}
          patientGynecology={patient.gynecology}
        />
      )}

      {activeSubTab === "grossesses" && (
        <PregnancyInfoSection
          patientId={patient.id}
          pregnancies={patient.pregnancies}
        />
      )}

      {activeSubTab === "sommeil" && (
        <SleepInfoSection patientId={patient.id} patientSleep={patient.sleep} />
      )}

      {activeSubTab === "rendez-vous" && (
        <AppointmentInfoSection patientId={patient.id} />
      )}
    </div>
  );
}
