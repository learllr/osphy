export const consultationDetailsFields = [
  { label: "Plainte", field: "patientComplaint", type: "textarea" },
  {
    label: "Facteurs aggravants",
    field: "aggravatingFactors",
    type: "textarea",
  },
  {
    label: "Facteurs soulageants",
    field: "relievingFactors",
    type: "textarea",
  },
  {
    label: "Symptômes associés",
    field: "associatedSymptoms",
    type: "textarea",
  },
  {
    label: "Type de douleur",
    field: "painType",
    type: "select",
    options: [
      "Neuropathique",
      "Nociceptive mécanique (périphérique)",
      "Nociceptive inflammatoire (périphérique)",
      "Centralisée",
    ],
  },
  {
    label: "Échelle EVA (0-10)",
    field: "eva",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    label: "Examen clinique",
    field: "clinicalExamination",
    type: "textarea",
  },
  {
    label: "Tests d'ostéopathie",
    field: "osteopathyTesting",
    type: "textarea",
  },
  { label: "Traitement", field: "treatment", type: "textarea" },
  { label: "Conseils", field: "advice", type: "textarea" },
];

export const appointmentFields = [
  { label: "Nom du patient", field: "name", editable: false },
  {
    label: "Type",
    field: "type",
    type: "select",
    options: [
      "Suivi",
      "Première consultation",
      "Urgence",
      "Bilan",
      "Pédiatrique",
      "Autre",
    ],
    allowEmptyOption: false,
  },
  {
    label: "Statut",
    field: "status",
    type: "select",
    options: ["Confirmé", "En attente", "Annulé"],
    allowEmptyOption: false,
  },
  { label: "Date", field: "date", type: "date" },
  { label: "Heure de début", field: "startTime", type: "time" },
  { label: "Heure de fin", field: "endTime", type: "time" },
];

export const patientInfosFields = [
  { label: "Nom", field: "lastName" },
  { label: "Prénom", field: "firstName" },
  {
    label: "Date de naissance",
    field: "birthDate",
    type: "date",
  },
  {
    label: "Sexe",
    field: "gender",
    type: "select",
    options: ["Homme", "Femme"],
  },
  { label: "Adresse", field: "address" },
  { label: "Téléphone", field: "mobilePhone" },
  { label: "Email", field: "email", type: "email" },
  { label: "Profession", field: "occupation" },
  { label: "Taille", field: "height", type: "number", min: 0, max: 300 },
  { label: "Poids", field: "weight", type: "number", min: 0, max: 300 },
  {
    label: "Latéralité",
    field: "handedness",
    type: "select",
    options: ["Droitier", "Gaucher", "Ambidextre"],
  },
  { label: "Autres informations", field: "additionalInfo", type: "textarea" },
];

export const sleepFields = [
  {
    label: "Qualité du sommeil",
    field: "sleepQuality",
    type: "select",
    options: ["Bon", "Moyen", "Mauvais"],
    format: (value) => value || "-",
  },
  {
    label: "Durée du sommeil",
    field: "sleepDuration",
    type: "select",
    options: ["<5h", "5-6h", "7-8h", ">8h"],
    format: (value) => value || "-",
  },
  {
    label: "Sommeil réparateur",
    field: "restorativeSleep",
    type: "select",
    options: ["Oui", "Non"],
    format: (value) => (value === true ? "Oui" : value === false ? "Non" : "-"),
    parse: (value) => (value === "Oui" ? true : value === "Non" ? false : null),
  },
];

export const pregnancyFields = [
  { label: "Sexe de l'enfant", field: "gender" },
  { label: "Méthode d'accouchement", field: "deliveryMethod" },
  {
    label: "Péridurale",
    field: "epidural",
    format: (value) => (value ? "Oui" : "Non"),
  },
];

export const gynecologyFields = [
  { label: "Règles", field: "period" },
  { label: "Ménopause", field: "menopause" },
  {
    label: "Contraception",
    field: "contraception",
    options: [
      "Aucune",
      "Stérilet",
      "Stérilet cuivre",
      "Stérilet hormonal",
      "Pilule",
      "Pilule (PC ou COC)",
      "Pilule (PP)",
      "Ogino",
      "Implant",
      "Patch",
      "Anneau",
      "Préservatif",
      "Retrait",
      "Autre",
    ],
  },
  { label: "Suivi gynécologique", field: "followUp" },
];
