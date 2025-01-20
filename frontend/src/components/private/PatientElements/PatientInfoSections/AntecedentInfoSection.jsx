import React, { useState } from "react";
import Section from "../../Design/Section.jsx";

export default function AntecedentInfoSection({ antecedents }) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const groupedAntecedents = {
    Traumatique:
      antecedents?.filter((ant) => ant.category === "Traumatique") || [],
    Médical: antecedents?.filter((ant) => ant.category === "Médical") || [],
    Chirurgical:
      antecedents?.filter((ant) => ant.category === "Chirurgical") || [],
  };

  const filteredAntecedents =
    selectedCategory === "Tous"
      ? groupedAntecedents
      : { [selectedCategory]: groupedAntecedents[selectedCategory] };

  return (
    <Section title="Antécédents" count={antecedents?.length || 0}>
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="mr-2">
          Filtrer par catégorie :
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="Tous">Tous</option>
          <option value="Traumatique">Traumatique</option>
          <option value="Médical">Médical</option>
          <option value="Chirurgical">Chirurgical</option>
        </select>
      </div>

      {Object.entries(filteredAntecedents).map(
        ([category, categoryAntecedents]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            {categoryAntecedents.length > 0 ? (
              <ul>
                {categoryAntecedents
                  .slice()
                  .sort((a, b) => a.year - b.year)
                  .map((antecedent) => (
                    <li key={antecedent.id}>
                      <strong>{antecedent.antecedent}</strong> (
                      {antecedent.year})
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Aucun antécédent dans cette catégorie.</p>
            )}
          </div>
        )
      )}
    </Section>
  );
}
