import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import PatientSearch from "../common/PatientSearch";
import { useUser } from "../contexts/UserContext";
import LogoutDialog from "../dialogs/LogoutDialog";

export default function NavBar() {
  const { user, isAuthenticated, logoutUser } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openLogoutDialog = () => setShowLogoutDialog(true);
  const closeLogoutDialog = () => setShowLogoutDialog(false);

  const handleLogout = () => {
    closeLogoutDialog();
    logoutUser();
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link
            to={isAuthenticated ? "/patients" : "/"}
            className="text-xl font-semibold text-gray-800 flex"
          >
            <div className="flex items-center gap-4 hover:text-zinc-700">
              <img
                src="/logos/skeleton.png"
                alt="Osphy"
                width={50}
                height={50}
              />
              Osphy
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/about"
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                >
                  Qui sommes-nous ?
                </Link>
                <Link
                  to="/contact"
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                >
                  Contact
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="text-primary border-primary hover:text-primary/80 hover:border-primary/80 hover:bg-white"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="text-white bg-primary hover:bg-primary/90">
                    Inscription
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/patients"
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                >
                  Patients
                </Link>
                <Link
                  to="/schedule"
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                >
                  Agenda
                </Link>
                <PatientSearch />
                <div className="flex items-center space-x-2">
                  <Link
                    to="/settings"
                    className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                  >
                    <FiSettings title="Paramètres" className="text-xl" />
                  </Link>
                  <Link
                    to="/manage-account"
                    className={`${navigationMenuTriggerStyle()} text-primary hover:text-primary/90`}
                  >
                    {user
                      ? `${user.firstName} ${user.lastName}`
                      : "Chargement..."}
                  </Link>
                  <button
                    onClick={openLogoutDialog}
                    className={`${navigationMenuTriggerStyle()}`}
                  >
                    <FiLogOut className="text-xl" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="text-gray-700 hover:text-gray-900 transition-transform duration-1000"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <LogoutDialog
          isVisible={showLogoutDialog}
          onClose={closeLogoutDialog}
          onConfirm={handleLogout}
        />
      </nav>
    </>
  );
}
