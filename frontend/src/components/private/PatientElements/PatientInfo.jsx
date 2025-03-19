import React from "react";
import ActivityInfoSection from "./PatientInfoSections/ActivityInfoSection.jsx";
import AntecedentInfoSection from "./PatientInfoSections/AntecedentInfoSection.jsx";
import AppointmentInfoSection from "./PatientInfoSections/AppointmentInfoSection.jsx";
import ContraindicationInfoSection from "./PatientInfoSections/ContraindicationInfoSection.jsx";
import GynecologyInfoSection from "./PatientInfoSections/GynecologyInfoSection.jsx";
import PregnancyInfoSection from "./PatientInfoSections/PregnancyInfoSection.jsx";
import SleepInfoSection from "./PatientInfoSections/SleepInfoSection.jsx";

export default function PatientInfo({ patient }) {
  return (
    <div>
      <div className="space-y-6">
        <ActivityInfoSection
          patientId={patient.id}
          activities={patient.activities}
        />

        <AntecedentInfoSection
          patientId={patient.id}
          antecedents={patient.antecedents}
        />

        <ContraindicationInfoSection
          patientId={patient.id}
          contraindications={patient.contraindications}
        />

        <GynecologyInfoSection
          patientId={patient.id}
          patientGynecology={patient.gynecology}
        />

        <PregnancyInfoSection
          patientId={patient.id}
          pregnancies={patient.pregnancies}
        />

        <SleepInfoSection patientId={patient.id} patientSleep={patient.sleep} />

        <AppointmentInfoSection patientId={patient.id} />
      </div>
    </div>
  );
}
