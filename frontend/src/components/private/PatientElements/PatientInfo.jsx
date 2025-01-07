import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig.js";
import DetailItem from "../Design/DetailItem.jsx";
import Section from "../Design/Section.jsx";

export default function PatientInfo({ patient }) {
  const [appointments, setAppointments] = useState([]);
  const [editingSections, setEditingSections] = useState({});
  const [editedPatient, setEditedPatient] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/appointment/${patient.id}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };
    fetchAppointments();
    setEditedPatient(patient);
  }, [patient]);

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
    <div>
      <div className="space-y-6">
        <Section
          title="Informations générales"
          showCount={false}
          onEdit={() => toggleEditSection("generalInfo")}
        >
          <DetailItem
            label="Nom"
            value={editedPatient.lastName}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("lastName", value)}
          />
          <DetailItem
            label="Prénom"
            value={editedPatient.firstName}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("firstName", value)}
          />
          <DetailItem
            label="Date de naissance"
            value={
              editingSections.generalInfo
                ? dayjs(editedPatient.birthDate).format("YYYY-MM-DD")
                : dayjs(patient.birthDate).format("DD/MM/YYYY")
            }
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("birthDate", value)}
            type="date"
          />
          <DetailItem
            label="Sexe"
            value={editedPatient.gender}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("gender", value)}
            type="select"
            options={[
              { label: "Homme", value: "Homme" },
              { label: "Femme", value: "Femme" },
            ]}
          />
          <DetailItem
            label="Adresse"
            value={editedPatient.address}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("address", value)}
          />
          <DetailItem
            label="Téléphone"
            value={editedPatient.mobilePhone}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("mobilePhone", value)}
          />
          <DetailItem
            label="Email"
            value={editedPatient.email}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("email", value)}
          />
          <DetailItem
            label="Profession"
            value={editedPatient.occupation}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("occupation", value)}
          />
          <DetailItem
            label="Taille"
            value={editedPatient.height}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("height", value)}
            type="number"
          />
          <DetailItem
            label="Poids"
            value={editedPatient.weight}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("weight", value)}
            type="number"
          />
          <DetailItem
            label="Latéralité"
            value={editedPatient.handedness}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("handedness", value)}
            type="select"
            options={[
              { label: "Droitier", value: "Droitier" },
              { label: "Gaucher", value: "Gaucher" },
              { label: "Ambidextre", value: "Ambidextre" },
            ]}
          />
          <DetailItem
            label="Autres informations"
            value={editedPatient.additionalInfo}
            isEditing={editingSections.generalInfo}
            onChange={(value) => handleInputChange("additionalInfo", value)}
          />
          {editingSections.generalInfo && (
            <div className="flex gap-4 mt-4">
              <Button onClick={() => saveChanges("generalInfo")}>
                Enregistrer
              </Button>
              <Button
                onClick={() => toggleEditSection("generalInfo")}
                className="bg-gray-300 text-gray-700"
              >
                Annuler
              </Button>
            </div>
          )}
        </Section>

        <Section title="Rendez-vous à venir" count={appointments.length}>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id} className="mb-2 flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      appointment.status === "Confirmé"
                        ? "bg-green-500"
                        : appointment.status === "En attente"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {dayjs(appointment.start).format("DD/MM/YYYY")}{" "}
                  <span className="text-gray-500 ml-1">
                    ({dayjs(appointment.start).format("HH:mm")} -{" "}
                    {dayjs(appointment.end).format("HH:mm")})
                  </span>
                  {appointment.comment && (
                    <span className="ml-4 text-gray-600 italic">
                      {appointment.comment}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun rendez-vous à venir.</p>
          )}
        </Section>

        <Section
          title="Activités"
          count={patient.activities?.length || 0}
          onEdit={() => toggleEditSection("activities")}
        >
          {patient.activities && patient.activities.length > 0 ? (
            <ul>
              {patient.activities.map((activity) => (
                <li key={activity.id}>
                  <strong>{activity.activity}</strong> ({activity.temporalInfo})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune activité enregistrée.</p>
          )}
        </Section>

        <Section title="Antécédents" count={patient.antecedents?.length || 0}>
          {patient.antecedents && patient.antecedents.length > 0 ? (
            <ul>
              {patient.antecedents
                .slice()
                .sort((a, b) => a.year - b.year)
                .map((antecedent) => (
                  <li key={antecedent.id}>
                    <strong>{antecedent.antecedent}</strong> ({antecedent.year})
                  </li>
                ))}
            </ul>
          ) : (
            <p>Aucun antécédent enregistré.</p>
          )}
        </Section>

        <Section
          title="Contre-indications"
          count={patient.contraindications?.length || 0}
        >
          {patient.contraindications && patient.contraindications.length > 0 ? (
            <ul>
              {patient.contraindications.map((ci) => (
                <li key={ci.id}>
                  <strong>{ci.contraindication}</strong> ({ci.temporalInfo})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune contre-indication enregistrée.</p>
          )}
        </Section>

        <Section
          title="Gynécologie"
          showCount={false}
          onEdit={() => toggleEditSection("gynecology")}
        >
          {editingSections.gynecology ? (
            <div className="space-y-4">
              <DetailItem
                label="Règles"
                value={editedPatient.gynecology?.period}
                isEditing={editingSections.gynecology}
                onChange={(value) =>
                  handleInputChange("gynecology.period", value)
                }
                type="select"
                options={[
                  { label: "Oui", value: "Oui" },
                  { label: "Non", value: "Non" },
                ]}
              />
              <DetailItem
                label="Ménopause"
                value={editedPatient.gynecology?.menopause}
                isEditing={editingSections.gynecology}
                onChange={(value) =>
                  handleInputChange("gynecology.menopause", value)
                }
                type="select"
                options={[
                  { label: "Oui", value: "Oui" },
                  { label: "Non", value: "Non" },
                ]}
              />
              <DetailItem
                label="Contraception"
                value={editedPatient.gynecology?.contraception}
                isEditing={editingSections.gynecology}
                onChange={(value) =>
                  handleInputChange("gynecology.contraception", value)
                }
              />
            </div>
          ) : (
            <div>
              <DetailItem
                label="Règles"
                value={patient.gynecology?.period ? "Oui" : "Non"}
              />
              <DetailItem
                label="Ménopause"
                value={patient.gynecology?.menopause ? "Oui" : "Non"}
              />
              <DetailItem
                label="Contraception"
                value={patient.gynecology?.contraception}
              />
            </div>
          )}
          {editingSections.gynecology && (
            <div className="flex gap-4 mt-4">
              <Button onClick={() => saveChanges("gynecology")}>
                Enregistrer
              </Button>
              <Button
                onClick={() => toggleEditSection("gynecology")}
                variant="secondary"
              >
                Annuler
              </Button>
            </div>
          )}
        </Section>

        <Section title="Grossesses" count={patient.pregnancies?.length || 0}>
          {patient.pregnancies && patient.pregnancies.length > 0 ? (
            patient.pregnancies.map((pregnancy) => (
              <div key={pregnancy.id} className="mb-4">
                <DetailItem label="Sexe de l'enfant" value={pregnancy.gender} />
                <DetailItem
                  label="Méthode d'accouchement"
                  value={pregnancy.deliveryMethod}
                />
                <DetailItem
                  label="Péridurale"
                  value={pregnancy.epidural ? "Oui" : "Non"}
                />
              </div>
            ))
          ) : (
            <p>Aucune grossesse enregistrée.</p>
          )}
        </Section>

        <Section
          title="Sommeil"
          showCount={false}
          onEdit={() => toggleEditSection("sleep")}
        >
          {editingSections.sleep ? (
            <DetailItem
              label="Qualité du sommeil"
              value={editedPatient.sleep?.sleepQuality}
              isEditing={editingSections.sleep}
              onChange={(value) =>
                handleInputChange("sleep.sleepQuality", value)
              }
            />
          ) : (
            <DetailItem
              label="Qualité du sommeil"
              value={patient.sleep?.sleepQuality || "Non renseigné"}
            />
          )}
        </Section>
      </div>
    </div>
  );
}
