import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Star } from "lucide-react";
import React from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  introMenuItems,
  subscriptionMenuItems,
} from "../../../../shared/constants/menuItems";
import PatientSearch from "../common/PatientSearch";

export default function DesktopNavBar({
  isAuthenticated,
  user,
  openLogoutDialog,
}) {
  return (
    <div className="hidden lg:flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
              Accueil
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white shadow-lg rounded-md p-8 min-w-[700px] absolute left-0">
              <div className="flex gap-6">
                <div className="flex flex-col space-y-3 w-1/3 p-6 bg-gray-50 rounded-md justify-center">
                  <h2 className="text-md font-semibold text-gray-800">Osphy</h2>
                  <p className="text-sm text-gray-500">
                    Découvrez notre solution pour la gestion de votre cabinet en
                    tant qu'ostéopathe.
                  </p>
                </div>
                <ul className="space-y-1">
                  {introMenuItems.map((item, idx) => (
                    <li key={idx} className="p-3 hover:bg-gray-50 rounded-md">
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
            <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
              Formules
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white shadow-lg rounded-md p-6 min-w-[400px]">
              <ul className="space-y-7">
                <li className="p-3 hover:bg-gray-100 rounded-md">
                  <Link to="/plans" className="flex items-center gap-4">
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
                      <Icon className="w-5 h-5 text-green-500 flex-shrink-0" />
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

      {!isAuthenticated ? (
        <>
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
          <PatientSearch />
          <Link to="/settings" className="ml-2">
            <FiSettings className="text-xl" />
          </Link>
          <Link to="/manage-account" className="text-primary font-medium ml-2">
            {user ? `${user.firstName} ${user.lastName}` : "Chargement..."}
          </Link>
          <button
            onClick={openLogoutDialog}
            className="ml-2 text-gray-700 hover:text-red-500 transition"
          >
            <FiLogOut className="text-xl" />
          </button>
        </>
      )}
    </div>
  );
}
