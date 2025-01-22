import React from "react";
import ActivityInfoSection from "./PatientInfoSections/ActivityInfoSection.jsx";
import AntecedentInfoSection from "./PatientInfoSections/AntecedentInfoSection.jsx";
import AppointmentInfoSection from "./PatientInfoSections/AppointmentInfoSection.jsx";
import ContraindicationInfoSection from "./PatientInfoSections/ContraindicationInfoSection.jsx";
import GeneralInfoSection from "./PatientInfoSections/GeneralInfoSection.jsx";
import GynecologyInfoSection from "./PatientInfoSections/GynecologyInfoSection.jsx";
import PregnancyInfoSection from "./PatientInfoSections/PregnancyInfoSection.jsx";
import SleepInfoSection from "./PatientInfoSections/SleepInfoSection.jsx";

export default function PatientInfo({ patient }) {
  return (
    <div>
      <div className="space-y-6">
        <GeneralInfoSection patient={patient} />

        <AppointmentInfoSection patientId={patient.id} />

        <ActivityInfoSection activities={patient.activities} />

        <AntecedentInfoSection antecedents={patient.antecedents} />

        <ContraindicationInfoSection
          contraindications={patient.contraindications}
        />

        <GynecologyInfoSection
          patientGynecology={patient.gynecology}
          patientId={patient.id}
        />

        <PregnancyInfoSection pregnancies={patient.pregnancies} />

        <SleepInfoSection patientSleep={patient.sleep} patientId={patient.id} />
      </div>
    </div>
  );
}
