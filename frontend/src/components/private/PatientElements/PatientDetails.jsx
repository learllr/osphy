import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { patientDetailsMenu } from "../../../../../shared/constants/menuItems.js";
import axios from "../../../axiosConfig.js";
import Body from "../../common/Body.jsx";
import LoadingScreen from "../../common/Loading/LoadingScreen.jsx";
import PageNavBar from "../Design/PageNavBar.jsx";
import ConsultationDetails from "./ConsultationDetails.jsx";
import ConsultationList from "./ConsultationList.jsx";
import PatientInfo from "./PatientInfo.jsx";

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [activeTab, setActiveTab] = useState("infos");
  const [activeSubTab, setActiveSubTab] = useState("general");

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
    console.log(consultation);
    setSelectedConsultation(consultation);
  };

  if (!patient) {
    return <LoadingScreen />;
  }

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

  if (!patient) {
    return <LoadingScreen />;
  }

  const handleConsultationUpdated = async (updatedConsultation) => {
    try {
      const response = await axios.get(`/consultation/${id}`);
      setConsultations(response.data);
      setSelectedConsultation(
        updatedConsultation
          ? response.data.find((c) => c.id === updatedConsultation.id)
          : null
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des consultations:", error);
    }
  };

  return (
    <Body>
      <PageNavBar
        menuItems={patientDetailsMenu}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeSubTab={activeSubTab}
        onSubTabChange={setActiveSubTab}
      />

      <div className="flex flex-col w-full mt-4">
        {activeTab === "consultations" ? (
          <div className="flex w-full gap-4">
            <div className="w-1/5">
              <ConsultationList
                consultations={consultations}
                onConsultationClick={handleConsultationClick}
                patientId={id}
                onConsultationAdded={handleConsultationAdded}
                onConsultationDeleted={handleConsultationDeleted}
              />
            </div>
            {selectedConsultation && (
              <div className="w-4/5">
                <ConsultationDetails
                  consultation={selectedConsultation}
                  patient={patient}
                  onConsultationUpdated={handleConsultationUpdated}
                />
              </div>
            )}
          </div>
        ) : (
          <PatientInfo patient={patient} activeSubTab={activeSubTab} />
        )}
      </div>
    </Body>
  );
}
