import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import LogoutModal from "../modals/LogoutModal.jsx";
import PatientSearch from "../common/PatientSearch.jsx";
import { FiSettings, FiLogOut } from "react-icons/fi";

export default function NavBar() {
  const { user, isAuthenticated, logoutUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isSubscribed = true;
  const navigate = useNavigate();

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    closeLogoutModal();
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="flex bg-zinc-800 text-white px-8 py-3 justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/">
          <span>OsteoLog</span>
        </Link>
      </div>

      {/* Liens pour Patients et Agenda */}
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

      {/* Liens de navigation */}
      <div className="flex space-x-4 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/settings">
              <FiSettings
                className="text-xl cursor-pointer"
                title="Paramètres"
              />
            </Link>
            <Link to="/manage-account">
              {user.firstName} {user.lastName.toUpperCase()}
            </Link>
            <button
              onClick={openLogoutModal}
              className="cursor-pointer flex items-center"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/signup">Inscription</Link>
          </>
        )}
      </div>

      {/* Modal de déconnexion */}
      <LogoutModal
        isVisible={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
