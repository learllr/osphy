import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import LogoutModal from "../modals/LogoutModal.jsx";

export default function NavBar() {
  const { isAuthenticated, logoutUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Rechercher:", searchQuery);
  };

  return (
    <nav className="flex bg-zinc-800 text-white px-8 py-3 justify-between items-center">
      {/* Logo à gauche */}
      <div>
        <Link to="/">
          <span>OsteoLog</span>
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="mx-4">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Rechercher un patient"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-96 px-4 py-2 rounded-full bg-white text-black"
          />
        </form>
      </div>

      {/* Liens de navigation à droite */}
      <div className="flex space-x-4">
        {isAuthenticated && isSubscribed && (
          <>
            <Link to="/patients">Patients</Link>
            <Link to="/schedule">Agenda</Link>
          </>
        )}
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
