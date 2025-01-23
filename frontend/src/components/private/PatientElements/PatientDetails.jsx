import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axiosConfig.js";
import Body from "../../common/Body.jsx";
import LoadingScreen from "../../common/Loading/LoadingScreen.jsx";
import ConsultationDetails from "./ConsultationDetails.jsx";
import ConsultationList from "./ConsultationList.jsx";
import PatientInfo from "./PatientInfo.jsx";
import GeneralInfoSection from "./PatientInfoSections/GeneralInfoSection.jsx";

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

  const handleConsultationUpdated = async (updatedConsultation) => {
    try {
      const response = await axios.get(`/consultation/${id}`);
      setConsultations(response.data);
      setSelectedConsultation(
        response.data.find((c) => c.id === updatedConsultation.id)
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des consultations:", error);
    }
  };

  if (!patient) {
    return <LoadingScreen />;
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
        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="w-1/2 p-1">
              <GeneralInfoSection patient={patient} />
            </div>
            <div className="w-1/2 p-1">
              {selectedConsultation ? (
                <ConsultationDetails
                  consultation={selectedConsultation}
                  patient={patient}
                  onConsultationUpdated={handleConsultationUpdated}
                />
              ) : (
                <p className="p-8 text-sm">Aucune consultation sélectionnée.</p>
              )}
            </div>
          </div>
          <div className="w-full p-1">
            <PatientInfo patient={patient} />
          </div>
        </div>
      </div>
    </Body>
  );
}
