import { FiSettings, FiLogOut } from "react-icons/fi";
import { CheckCircle, Star, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import LogoutDialog from "../dialogs/LogoutDialog";
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
import Alert from "./Alert.jsx";

const introMenuItems = [
  {
    title: "Fonctionnalités",
    description:
      "Des outils puissants pour gérer vos patients, planifier vos rendez-vous et suivre leur évolution.",
    href: "/#features",
  },
  {
    title: "Avantages",
    description:
      "Gagnez du temps, améliorez votre organisation et la qualité de vos soins.",
    href: "/#benefits",
  },
  {
    title: "Sécurité",
    description:
      "Données protégées selon les normes les plus strictes pour assurer confidentialité et sécurité.",
    href: "/#security",
  },
  {
    title: "Support",
    description:
      "Une équipe dédiée pour vous accompagner et optimiser votre expérience.",
    href: "/#support",
  },
];

const subscriptionMenuItems = [
  {
    title: "Formule Classique",
    description: "Accédez aux fonctionnalités de base.",
    icon: CheckCircle,
    link: "/plans/classic",
  },
  {
    title: "Formule Premium",
    description: "Profitez de fonctionnalités avancées pour un suivi amélioré.",
    icon: Star,
    link: "/plans/premium",
  },
];

export default function NavBar() {
  const { user, isAuthenticated, logoutUser } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openLogoutDialog = () => setShowLogoutDialog(true);
  const closeLogoutDialog = () => setShowLogoutDialog(false);

  const handleLogout = () => {
    closeLogoutDialog();
    logoutUser();
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-semibold text-gray-800 flex">
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
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link to="/">
                        <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                          Accueil
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent className="bg-white shadow-lg rounded-md p-8 min-w-[700px]">
                        <div className="flex gap-6">
                          <div className="flex flex-col space-y-3 w-1/3 p-6 bg-gray-50 rounded-md justify-center">
                            <h2 className="text-md font-semibold text-gray-800">
                              Osphy
                            </h2>
                            <p className="text-sm text-gray-500">
                              Découvrez notre solution pour la gestion de votre
                              cabinet en tant qu'ostéopathe.
                            </p>
                          </div>
                          <ul className="space-y-1">
                            {introMenuItems.map((item, idx) => (
                              <li
                                key={idx}
                                className="p-3 hover:bg-gray-50 rounded-md"
                              >
                                <a href={item.href}>
                                  <p className="font-semibold text-sm text-green-500">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {item.description}
                                  </p>
                                </a>
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
                      <Link to="/plans">
                        <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                          Formules
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent className="bg-white shadow-lg rounded-md p-6 min-w-[400px]">
                        <ul className="space-y-7">
                          <li className="p-3 hover:bg-gray-100 rounded-md">
                            <Link
                              to="/plans"
                              className="flex items-center gap-4"
                            >
                              <Star className="text-blue-500" />
                              <div>
                                <p className="font-semibold text-sm text-gray-800">
                                  Voir toutes les formules
                                </p>
                                <p className="text-sm text-gray-600">
                                  Comparez toutes les formules disponibles
                                </p>
                              </div>
                            </Link>
                          </li>
                          {subscriptionMenuItems.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <li
                                key={idx}
                                className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-md"
                              >
                                <Icon className="text-green-500" />
                                <Link to={item.link}>
                                  <div>
                                    <p className="font-semibold text-sm text-gray-800">
                                      {item.title}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
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
                onClick={openLogoutDialog}
                className="block text-gray-700 hover:text-gray-900 py-2"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>

        <LogoutDialog
          isVisible={showLogoutDialog}
          onClose={closeLogoutDialog}
          onConfirm={handleLogout}
        />
      </nav>
      <Alert />
    </>
  );
}
