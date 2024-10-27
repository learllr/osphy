import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import LogoutModal from "../modals/LogoutModal.jsx";
import PatientSearch from "../common/PatientSearch.jsx";

export default function NavBar() {
  const { isAuthenticated, logoutUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isSubscribed = true;
  const navigate = useNavigate();

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    closeLogoutModal();
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="flex bg-zinc-800 text-white px-8 py-3 justify-between items-center">
      {/* Logo à gauche */}
      <div>
        <Link to="/">
          <span>OsteoLog</span>
        </Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated && isSubscribed && (
          <>
            <Link to="/patients">Patients</Link>
            <Link to="/schedule">Agenda</Link>
          </>
        )}
      </div>

      {/* Barre de recherche */}
      {isAuthenticated && isSubscribed && <PatientSearch />}

      {/* Liens de navigation à droite */}
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/manage-account">Mon Compte</Link>
            <button onClick={openLogoutModal} className="cursor-pointer">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/signup">Inscription</Link>
          </>
        )}
      </div>

      <LogoutModal
        isVisible={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
