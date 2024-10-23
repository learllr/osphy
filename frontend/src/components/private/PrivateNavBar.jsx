import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PrivateNavBar() {

  return (
    <nav className="flex bg-zinc-800 text-white p-8 justify-between items-center">
      {/* Logo à gauche */}
      <div>
        <Link to="/">
          <span>OsteoLog</span>
        </Link>
      </div>

      {/* Liens de navigation à droite */}
      <div className="flex space-x-4">
        <Link to="/patients">Patients</Link>
        <Link to="/schedule">Agenda</Link>
      </div>
    </nav>
  );
}
