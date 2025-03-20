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
      <div className="container mx-auto flex flex-col items-start space-y-2">
        {!isAuthenticated ? (
          <>
            <Link
              to="/about"
              className={`${navigationMenuTriggerStyle()} w-full`}
              onClick={toggleMenu}
            >
              Qui sommes-nous ?
            </Link>
            <Link
              to="/contact"
              className={`${navigationMenuTriggerStyle()} w-full`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
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
            <Link
              to="/patients"
              className={`${navigationMenuTriggerStyle()} w-full`}
              onClick={toggleMenu}
            >
              Patients
            </Link>
            <Link
              to="/schedule"
              className={`${navigationMenuTriggerStyle()} w-full`}
              onClick={toggleMenu}
            >
              Agenda
            </Link>

            <div className="w-full">
              <PatientSearch />
            </div>

            <Link
              to="/settings"
              className={`${navigationMenuTriggerStyle()} w-full flex items-center gap-2`}
              onClick={toggleMenu}
            >
              <FiSettings className="text-xl" />
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
              <FiLogOut className="text-xl" />
              Déconnexion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
