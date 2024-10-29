import React from "react";

export default function PatientInfo({ patient }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Fiche du patient</h1>
      <div className="px-8 pt-6 pb-8 mb-4">
        {/* Informations Générales */}
        <h2 className="text-xl mb-2">Informations générales</h2>
        <p>
          <strong>Nom:</strong> {patient.lastName} {patient.firstName}
        </p>
        <p>
          <strong>Date de naissance:</strong>{" "}
          {new Date(patient.birthDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Genre:</strong> {patient.gender}
        </p>
        <p>
          <strong>Adresse:</strong> {patient.address}, {patient.postalCode}{" "}
          {patient.city}
        </p>
        <p>
          <strong>Téléphone:</strong> {patient.mobilePhone}
        </p>
        <p>
          <strong>Email:</strong> {patient.email}
        </p>
        <p>
          <strong>Profession:</strong> {patient.occupation}
        </p>
        <p>
          <strong>Taille:</strong> {patient.height} cm
        </p>
        <p>
          <strong>Poids:</strong> {patient.weight} kg
        </p>
        <p>
          <strong>Latéralité:</strong> {patient.handedness}
        </p>
        <p>
          <strong>Traitements médicaux:</strong> {patient.medicalTreatments}
        </p>
        <p>
          <strong>Autres informations:</strong> {patient.additionalInfo}
        </p>

        {/* Activités */}
        <h2 className="text-xl mb-2 mt-4">Activités</h2>
        <ul>
          {patient.activities && patient.activities.length > 0 ? (
            patient.activities.map((activity) => (
              <li key={activity.id}>
                <strong>{activity.activity}</strong> ({activity.temporalInfo})
              </li>
            ))
          ) : (
            <li>Aucune activité enregistrée.</li>
          )}
        </ul>

        {/* Antécédents */}
        <h2 className="text-xl mb-2 mt-4">Antécédents</h2>
        <ul>
          {patient.antecedents && patient.antecedents.length > 0 ? (
            patient.antecedents.map((antecedent) => (
              <li key={antecedent.id}>
                <strong>{antecedent.antecedent}</strong> (
                {antecedent.temporalInfo})
              </li>
            ))
          ) : (
            <li>Aucun antécédent enregistré.</li>
          )}
        </ul>

        {/* Contre-indications */}
        <h2 className="text-xl mb-2 mt-4">Contre-indications</h2>
        <ul>
          {patient.contraindications && patient.contraindications.length > 0 ? (
            patient.contraindications.map((ci) => (
              <li key={ci.id}>
                <strong>{ci.contraindication}</strong> ({ci.temporalInfo})
              </li>
            ))
          ) : (
            <li>Aucune contre-indication enregistrée.</li>
          )}
        </ul>

        {/* Gynécologie */}
        <h2 className="text-xl mb-2 mt-4">Gynécologie</h2>
        {patient.gynecology ? (
          <div>
            <p>
              <strong>Règle:</strong>{" "}
              {patient.gynecology.period ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Ménopause:</strong>{" "}
              {patient.gynecology.menopause ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Moyen de contraception:</strong>{" "}
              {patient.gynecology.contraception}
            </p>
          </div>
        ) : (
          <p>Aucune information gynécologique enregistrée.</p>
        )}

        {/* Grossesses */}
        <h2 className="text-xl mb-2 mt-4">Grossesses</h2>
        <ul>
          {patient.pregnancies && patient.pregnancies.length > 0 ? (
            patient.pregnancies.map((pregnancy) => (
              <div key={pregnancy.id}>
                <p>
                  <strong>Genre de l'enfant:</strong> {pregnancy.gender}
                </p>
                <p>
                  <strong>Méthode d'accouchement:</strong>{" "}
                  {pregnancy.deliveryMethod}
                </p>
                <p>
                  <strong>Péridurale:</strong>{" "}
                  {pregnancy.epidural ? "Oui" : "Non"}
                </p>
              </div>
            ))
          ) : (
            <p>Aucune grossesse enregistrée.</p>
          )}
        </ul>

        {/* Sommeil */}
        <h2 className="text-xl mb-2 mt-4">Sommeil</h2>
        {patient.sleep ? (
          <div>
            <p>
              <strong>Qualité du sommeil:</strong> {patient.sleep.sleepQuality}
            </p>
            <p>
              <strong>Durée du sommeil:</strong> {patient.sleep.sleepDuration}
            </p>
            <p>
              <strong>Sommeil réparateur:</strong>{" "}
              {patient.sleep.restorativeSleep ? "Oui" : "Non"}
            </p>
          </div>
        ) : (
          <p>Aucune information sur le sommeil enregistrée.</p>
        )}

        {/* Praticiens */}
        <h2 className="text-xl mb-2 mt-4">Praticiens</h2>
        <ul>
          {patient.practitioners && patient.practitioners.length > 0 ? (
            patient.practitioners.map((practitioner) => (
              <li key={practitioner.id}>
                <strong>{practitioner.fullName}</strong> (
                {practitioner.profession})
              </li>
            ))
          ) : (
            <li>Aucun praticien enregistré.</li>
          )}
        </ul>

        {/* Avertissements */}
        <h2 className="text-xl mb-2 mt-4">Avertissements</h2>
        <ul>
          {patient.warnings && patient.warnings.length > 0 ? (
            patient.warnings.map((warning) => (
              <li key={warning.id}>{warning.warning}</li>
            ))
          ) : (
            <li>Aucun avertissement enregistré.</li>
          )}
        </ul>
      </div>
    </>
  );
}