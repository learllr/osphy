import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axiosConfig.js";
import Body from "../../common/Body.jsx";
import ConsultationDetails from "./ConsultationDetails.jsx";
import ConsultationList from "./ConsultationList.jsx";
import PatientInfo from "./PatientInfo.jsx";

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientResponse = await axios.get(`/patient/${id}`);
        const consultationResponse = await axios.get(`/consultation/${id}`);
        setPatient(patientResponse.data);
        setConsultations(consultationResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleConsultationAdded = (newConsultation) => {
    setConsultations((prev) => [...prev, newConsultation]);
    setSelectedConsultation(newConsultation);
  };

  const handleConsultationDeleted = (deletedId) => {
    setConsultations((prev) => {
      const updatedConsultations = prev.filter((c) => c.id !== deletedId);

      if (selectedConsultation && selectedConsultation.id === deletedId) {
        setSelectedConsultation(null);
      }

      return updatedConsultations;
    });
  };

  const handleConsultationUpdated = (updatedConsultation) => {
    setConsultations((prev) =>
      prev.map((c) =>
        c.id === updatedConsultation.id ? updatedConsultation : c
      )
    );

    if (
      selectedConsultation &&
      selectedConsultation.id === updatedConsultation.id
    ) {
      setSelectedConsultation(updatedConsultation);
    }
  };

  if (!patient) {
    return <div>Chargement...</div>;
  }

  return (
    <Body>
      <div className="flex">
        <div className="w-2/12 pr-6 mt-4">
          <ConsultationList
            consultations={consultations}
            onConsultationClick={handleConsultationClick}
            patientId={id}
            onConsultationAdded={handleConsultationAdded}
            onConsultationDeleted={handleConsultationDeleted}
          />
        </div>
        <div className="w-5/12 p-2">
          <PatientInfo patient={patient} />
        </div>
        <div className="w-5/12 p-2">
          {selectedConsultation ? (
            <ConsultationDetails
              consultation={selectedConsultation}
              patient={patient}
              onConsultationUpdated={handleConsultationUpdated}
            />
          ) : (
            <p className="p-8">Aucune consultation sélectionnée.</p>
          )}
        </div>
      </div>
    </Body>
  );
}
