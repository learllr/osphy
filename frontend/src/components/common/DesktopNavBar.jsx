import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import React from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import PatientSearch from "../common/PatientSearch";

export default function DesktopNavBar({
  isAuthenticated,
  user,
  openLogoutDialog,
}) {
  return (
    <div className="hidden lg:flex items-center space-x-2">
      {!isAuthenticated ? (
        <>
          <Link to="/about" className={navigationMenuTriggerStyle()}>
            Qui sommes-nous ?
          </Link>
          <Link to="/contact" className={navigationMenuTriggerStyle()}>
            Contact
          </Link>
          <Link to="/login">
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-white"
            >
              Connexion
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary text-white">Inscription</Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/patients" className={navigationMenuTriggerStyle()}>
            Patients
          </Link>
          <Link to="/schedule" className={navigationMenuTriggerStyle()}>
            Agenda
          </Link>

          <PatientSearch />

          <Link to="/settings" className={navigationMenuTriggerStyle()}>
            <FiSettings className="text-xl" />
          </Link>
          <Link
            to="/manage-account"
            className={`${navigationMenuTriggerStyle()} text-primary`}
          >
            {user ? `${user.firstName} ${user.lastName}` : "Chargement..."}
          </Link>
          <button
            onClick={openLogoutDialog}
            className={navigationMenuTriggerStyle()}
          >
            <FiLogOut className="text-xl" />
          </button>
        </>
      )}
    </div>
  );
}
