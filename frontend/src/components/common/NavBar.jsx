import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import LogoutDialog from "../dialogs/LogoutDialog";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

export default function NavBar() {
  const { user, isAuthenticated, logoutUser } = useUser();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [opacityClass, setOpacityClass] = useState("opacity-0");

  const openLogoutDialog = () => setShowLogoutDialog(true);
  const closeLogoutDialog = () => setShowLogoutDialog(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setShouldRenderMenu(true);
    }
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    let timeoutId;
    if (isMenuOpen) {
      timeoutId = setTimeout(() => setOpacityClass("opacity-100"), 10);
    } else {
      setOpacityClass("opacity-0");
      timeoutId = setTimeout(() => setShouldRenderMenu(false), 200);
    }

    return () => clearTimeout(timeoutId);
  }, [isMenuOpen]);

  const handleLogout = () => {
    closeLogoutDialog();
    logoutUser();
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4">
          <Link
            to={isAuthenticated ? "/patients" : "/"}
            className="text-xl font-semibold flex items-center gap-4"
          >
            <img src="/logos/skeleton.png" alt="Osphy" width={50} height={50} />
            Osphy
          </Link>

          <DesktopNavBar
            isAuthenticated={isAuthenticated}
            user={user}
            openLogoutDialog={openLogoutDialog}
          />

          <div className="lg:hidden">
            <Button variant="outline" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {shouldRenderMenu && (
          <div className={`transition-opacity duration-300 ${opacityClass}`}>
            <MobileNavBar
              isAuthenticated={isAuthenticated}
              user={user}
              toggleMenu={toggleMenu}
              openLogoutDialog={openLogoutDialog}
            />
          </div>
        )}

        <LogoutDialog
          isVisible={showLogoutDialog}
          onClose={closeLogoutDialog}
          onConfirm={handleLogout}
        />
      </nav>
    </>
  );
}
