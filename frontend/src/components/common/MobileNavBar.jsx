import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import React from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import PatientSearch from "../common/PatientSearch";

export default function MobileNavBar({
  isAuthenticated,
  user,
  toggleMenu,
  openLogoutDialog,
}) {
  return (
    <div className="lg:hidden bg-white shadow py-4">
      <div className="container mx-auto flex flex-col space-y-2">
        <Link
          to="/"
          className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
          onClick={toggleMenu}
        >
          Accueil
        </Link>

        <Link
          to="/about"
          className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
          onClick={toggleMenu}
        >
          Qui sommes-nous ?
        </Link>

        <Link
          to="/plans"
          className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
          onClick={toggleMenu}
        >
          Formules
        </Link>

        <Link
          to="/contact"
          className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
          onClick={toggleMenu}
        >
          Contact
        </Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" className="w-full" onClick={toggleMenu}>
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-white w-full"
              >
                Connexion
              </Button>
            </Link>
            <Link to="/signup" className="w-full" onClick={toggleMenu}>
              <Button className="bg-primary text-white w-full">
                Inscription
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div className="w-full">
              <PatientSearch />
            </div>
            <Link
              to="/settings"
              className={`${navigationMenuTriggerStyle()} w-full flex items-center gap-2`}
              onClick={toggleMenu}
            >
              <FiSettings className="w-5 h-5 flex-shrink-0" />
              Paramètres
            </Link>
            <Link
              to="/manage-account"
              className={`${navigationMenuTriggerStyle()} text-primary w-full`}
              onClick={toggleMenu}
            >
              {user ? `${user.firstName} ${user.lastName}` : "Chargement..."}
            </Link>
            <button
              onClick={() => {
                toggleMenu();
                openLogoutDialog();
              }}
              className={`${navigationMenuTriggerStyle()} w-full flex items-center gap-2`}
            >
              <FiLogOut className="w-5 h-5 flex-shrink-0" />
              Déconnexion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
