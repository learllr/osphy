import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import LogoutModal from "../modals/LogoutModal.jsx";

export default function PublicNavBar() {
  const { isAuthenticated, logoutUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isSubscribed = true;

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    closeLogoutModal();
    logoutUser();
  };

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
        {isAuthenticated && isSubscribed && (
          <Link to="/dashboard">Tableau de bord</Link>
        )}
        {isAuthenticated ? (
          <>
            <Link to="/manage-account">Mon Compte</Link>
            <button
              onClick={openLogoutModal}
              className="cursor-pointer"
            >
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
