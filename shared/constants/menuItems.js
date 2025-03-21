import { CircleCheckBig, Star, Stethoscope, User } from "lucide-react";

export const introMenuItems = [
  {
    title: "Fonctionnalités",
    description:
      "Des outils puissants pour gérer vos patients, planifier vos rendez-vous et suivre leur évolution.",
    href: "/#features",
  },
  {
    title: "Avantages",
    description:
      "Gagnez du temps, améliorez votre organisation et la qualité de vos soins.",
    href: "/#benefits",
  },
  {
    title: "Sécurité",
    description:
      "Données protégées selon les normes les plus strictes pour assurer confidentialité et sécurité.",
    href: "/#security",
  },
  {
    title: "Support",
    description:
      "Une équipe dédiée pour vous accompagner et optimiser votre expérience.",
    href: "/#support",
  },
];

export const subscriptionMenuItems = [
  {
    title: "Formule Classique",
    description: "Accédez aux fonctionnalités de base.",
    icon: CircleCheckBig,
    link: "/plans/classic",
  },
  {
    title: "Formule Premium",
    description: "Profitez de fonctionnalités avancées pour un suivi amélioré.",
    icon: Star,
    link: "/plans/premium",
  },
];
export const patientDetailsMenu = [
  {
    label: "Informations du patient",
    path: "infos",
    icon: User,
    subMenu: [
      { label: "Informations générales", path: "general" },
      { label: "Activités", path: "activites" },
      { label: "Antécédents", path: "antecedents" },
      { label: "Contre-indications", path: "contre-indications" },
      { label: "Gynécologie", path: "gynecologie" },
      { label: "Grossesses", path: "grossesses" },
      { label: "Sommeil", path: "sommeil" },
      { label: "Rendez-vous", path: "rendez-vous" },
    ],
  },
  {
    label: "Consultations",
    path: "consultations",
    icon: Stethoscope,
    subMenu: [],
  },
];
