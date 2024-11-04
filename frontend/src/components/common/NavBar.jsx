import { FiSettings, FiLogOut } from "react-icons/fi";
import { CheckCircle, Star, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import LogoutModal from "../modals/LogoutModal";
import PatientSearch from "../common/PatientSearch";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const introMenuItems = [
  {
    title: "Fonctionnalités",
    description:
      "Découvrez notre application pour la gestion de patients et de son agenda.",
  },
  {
    title: "Abonnement",
    description:
      "Faites-vous guider pour vous abonnez à la formule qui vous convient.",
  },
];

const subscriptionMenuItems = [
  {
    title: "Formule Classique",
    description: "Accédez aux fonctionnalités de base.",
    icon: CheckCircle,
  },
  {
    title: "Formule Premium",
    description: "Profitez de fonctionnalités avancées pour un suivi amélioré.",
    icon: Star,
  },
];

export default function NavBar() {
  const { user, isAuthenticated, logoutUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    closeLogoutModal();
    logoutUser();
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
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
                    <NavigationMenuContent className="bg-white shadow-lg rounded-md p-8 min-w-[550px]">
                      <div className="flex gap-6">
                        <div className="flex flex-col space-y-3 w-1/3 p-6 bg-gray-50 rounded-md justify-center">
                          <h2 className="text-md font-semibold text-gray-800">
                            OsteoLog
                          </h2>
                          <p className="text-sm text-gray-500">
                            Découvrez notre solution pour la gestion de votre
                            cabinet en tant qu'ostéopathe.
                          </p>
                        </div>
                        <ul className="space-y-7 w-2/3">
                          {introMenuItems.map((item, idx) => (
                            <li
                              key={idx}
                              className="p-6 hover:bg-gray-50 rounded-md"
                            >
                              <div>
                                <p className="font-semibold text-sm text-green-500">
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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                      Formules
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white shadow-lg rounded-md p-6 min-w-[400px]">
                      <ul className="space-y-7">
                        {subscriptionMenuItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <li
                              key={idx}
                              className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-md"
                            >
                              <Icon className="text-green-500" />
                              <div>
                                <p className="font-semibold text-sm text-gray-800">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/settings"
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                >
                  <FiSettings title="Paramètres" className="text-xl" />
                </Link>
                <Link
                  to="/manage-account"
                  className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900`}
                >
                  {user
                    ? `${user.firstName} ${user.lastName}`
                    : "Chargement..."}
                </Link>
                <button
                  onClick={openLogoutModal}
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

      <div
        className={`lg:hidden px-4 bg-white transition-all duration-1000 transform ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {!isAuthenticated ? (
          <div className="space-y-1 font-semibold mb-4">
            <Link
              to="/about"
              className="block text-gray-700 hover:text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              Qui sommes-nous ?
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block text-primary border-primary hover:text-primary/80 hover:border-primary/80 hover:bg-white px-4 py-2 border-[1px] rounded-md"
            >
              Connexion
            </Link>
            <Link
              to="/signup"
              className="block text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md"
            >
              Inscription
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/patients"
              className="block text-gray-700 hover:text-gray-900 py-2"
            >
              Patients
            </Link>
            <Link
              to="/schedule"
              className="block text-gray-700 hover:text-gray-900 py-2"
            >
              Agenda
            </Link>
            <button
              onClick={openLogoutModal}
              className="block text-gray-700 hover:text-gray-900 py-2"
            >
              Déconnexion
            </button>
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
