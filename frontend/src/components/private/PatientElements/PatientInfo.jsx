import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig.js";
import dayjs from "dayjs";
import Section from "../Design/Section.jsx";
import DetailItem from "../Design/DetailItem.jsx";

export default function PatientInfo({ patient }) {
  const [appointments, setAppointments] = useState([]);

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
  }, [patient.id]);

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.start) > new Date()
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmé":
        return "bg-green-500";
      case "En attente":
        return "bg-orange-500";
      case "Annulé":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen p-8">
      <div className="space-y-6">
        <Section title="Informations générales">
          <DetailItem
            label="Nom"
            value={`${patient.lastName} ${patient.firstName}`}
          />
          <DetailItem
            label="Date de naissance"
            value={dayjs(patient.birthDate).format("DD/MM/YYYY")}
          />
          <DetailItem label="Genre" value={patient.gender} />
          <DetailItem
            label="Adresse"
            value={`${patient.address}, ${patient.postalCode} ${patient.city}`}
          />
          <DetailItem label="Téléphone" value={patient.mobilePhone} />
          <DetailItem label="Email" value={patient.email} />
          <DetailItem label="Profession" value={patient.occupation} />
          <DetailItem label="Taille" value={`${patient.height} cm`} />
          <DetailItem label="Poids" value={`${patient.weight} kg`} />
          <DetailItem label="Latéralité" value={patient.handedness} />
          <DetailItem
            label="Traitements médicaux"
            value={patient.medicalTreatments}
          />
          <DetailItem
            label="Autres informations"
            value={patient.additionalInfo}
          />
        </Section>

        <Section title="Rendez-vous à venir">
          {upcomingAppointments.length > 0 ? (
            <ul>
              {upcomingAppointments.map((appointment) => (
                <li key={appointment.id} className="mb-2 flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${getStatusStyle(
                      appointment.status
                    )}`}
                  ></span>
                  {dayjs(appointment.start).format("DD/MM/YYYY")}{" "}
                  <span className="text-gray-500 ml-1">
                    ({dayjs(appointment.start).format("HH:mm")} -{" "}
                    {dayjs(appointment.end).format("HH:mm")})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun rendez-vous à venir.</p>
          )}
        </Section>

        <Section title="Activités">
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

        <Section title="Antécédents">
          {patient.antecedents && patient.antecedents.length > 0 ? (
            <ul>
              {patient.antecedents.map((antecedent) => (
                <li key={antecedent.id}>
                  <strong>{antecedent.antecedent}</strong> (
                  {antecedent.temporalInfo})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun antécédent enregistré.</p>
          )}
        </Section>

        <Section title="Contre-indications">
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

        <Section title="Gynécologie">
          {patient.gynecology ? (
            <div>
              <DetailItem
                label="Règle"
                value={patient.gynecology.period ? "Oui" : "Non"}
              />
              <DetailItem
                label="Ménopause"
                value={patient.gynecology.menopause ? "Oui" : "Non"}
              />
              <DetailItem
                label="Moyen de contraception"
                value={patient.gynecology.contraception}
              />
            </div>
          ) : (
            <p>Aucune information gynécologique enregistrée.</p>
          )}
        </Section>

        <Section title="Grossesses">
          {patient.pregnancies && patient.pregnancies.length > 0 ? (
            patient.pregnancies.map((pregnancy) => (
              <div key={pregnancy.id} className="mb-4">
                <DetailItem
                  label="Genre de l'enfant"
                  value={pregnancy.gender}
                />
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

        <Section title="Sommeil">
          {patient.sleep ? (
            <div>
              <DetailItem
                label="Qualité du sommeil"
                value={patient.sleep.sleepQuality}
              />
              <DetailItem
                label="Durée du sommeil"
                value={patient.sleep.sleepDuration}
              />
              <DetailItem
                label="Sommeil réparateur"
                value={patient.sleep.restorativeSleep ? "Oui" : "Non"}
              />
            </div>
          ) : (
            <p>Aucune information sur le sommeil enregistrée.</p>
          )}
        </Section>

        <Section title="Praticiens">
          {patient.practitioners && patient.practitioners.length > 0 ? (
            <ul>
              {patient.practitioners.map((practitioner) => (
                <li key={practitioner.id}>
                  <strong>{practitioner.fullName}</strong> (
                  {practitioner.profession})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun praticien enregistré.</p>
          )}
        </Section>

        <Section title="Avertissements">
          {patient.warnings && patient.warnings.length > 0 ? (
            <ul>
              {patient.warnings.map((warning) => (
                <li key={warning.id}>{warning.warning}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun avertissement enregistré.</p>
          )}
        </Section>
      </div>
    </div>
  );
}
