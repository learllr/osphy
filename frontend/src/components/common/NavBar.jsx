import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import LogoutModal from "../modals/LogoutModal";
import PatientSearch from "../common/PatientSearch";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const introMenuItems = [
  {
    title: "Introduction",
    description: "Découvrez notre application pour la gestion de patients.",
  },
  {
    title: "Fonctionnalités",
    description: "Explorez les fonctionnalités avancées pour ostéopathes.",
  },
];

export default function NavBar() {
  const { user, isAuthenticated, logoutUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    closeLogoutModal();
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            OsteoLog
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {!isAuthenticated ? (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                      Découvrir
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white shadow-lg rounded-md p-6">
                      <div className="flex gap-6">
                        <div className="flex flex-col space-y-3 w-2/5 p-6 bg-gray-50 rounded-md">
                          <h2 className="text-xl font-semibold text-gray-800">
                            OsteoLog
                          </h2>
                          <p className="text-sm text-gray-600">
                            Découvrez notre solution pour la gestion de vos
                            patients en tant qu'ostéopathe.
                          </p>
                        </div>
                        <ul className="space-y-3 w-3/5">
                          {introMenuItems.map((item, idx) => (
                            <li
                              key={idx}
                              className="p-2 hover:bg-gray-100 rounded-md"
                            >
                              <div>
                                <p className="font-semibold text-sm text-gray-800">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
                  className="text-gray-700 border-gray-300 hover:text-gray-900 hover:border-gray-400"
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-white bg-gray-800 hover:bg-gray-700">
                  Inscription
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/patients"
                className="text-gray-700 hover:text-gray-900"
              >
                Patients
              </Link>
              <Link
                to="/schedule"
                className="text-gray-700 hover:text-gray-900"
              >
                Agenda
              </Link>
              <PatientSearch />
              <div className="flex items-center space-x-4">
                <Link
                  to="/settings"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FiSettings title="Paramètres" className="text-xl" />
                </Link>
                <Link
                  to="/manage-account"
                  className="text-gray-700 hover:text-gray-900"
                >
                  {user
                    ? `${user.firstName} ${user.lastName}`
                    : "Chargement..."}
                </Link>
                <button
                  onClick={openLogoutModal}
                  className="text-gray-700 hover:text-gray-900"
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
            className="text-gray-700 hover:text-gray-900"
          >
            <Menu />
          </Button>
        </div>
      </div>

      <LogoutModal
        isVisible={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
