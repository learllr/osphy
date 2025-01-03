import React from "react";
import Body from "../common/Body.jsx";

export default function About() {
  return (
    <Body>
      <section className="py-16" id="about">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">À propos</h2>
          <p className="text-lg text-gray-600">
            Osphy est une plateforme dédiée à la gestion des cabinets
            d'ostéopathie. Nous aidons les praticiens à gérer leurs patients,
            organiser leurs rendez-vous, et offrir un suivi de qualité.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50" id="team">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Notre Équipe</h2>
          <p className="text-lg text-gray-600">
            Nous sommes une équipe de passionnés, composée de développeurs, de
            designers et de spécialistes de la santé, dédiés à l'amélioration
            des services d'ostéopathie.
          </p>
        </div>
      </section>
    </Body>
  );
}
