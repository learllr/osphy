import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/authentification/Login.jsx";
import Signup from "./components/authentification/Signup.jsx";
import PatientDetails from "./components/private/PatientElements/PatientDetails.jsx";
import Patients from "./components/private/Patients.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import Schedule from "./components/private/Schedule.jsx";
import Settings from "./components/private/Settings.jsx";
import About from "./components/public/About.jsx";
import AccountManagement from "./components/public/AccountManagement.jsx";
import Contact from "./components/public/Contact.jsx";
import Home from "./components/public/Home.jsx";
import PricingPlans from "./components/public/PrincingPlans.jsx";

export default function App() {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType("MOBILE (sm)");
      } else if (width >= 640 && width < 1024) {
        setDeviceType("TABLETTE (md)");
      } else {
        setDeviceType("ORDI (lg)");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/plans" element={<PricingPlans />} />
      <Route path="/plans/:planType" element={<PricingPlans />} />

      {/* Routes privées */}
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <PrivateRoute>
            <Schedule />
          </PrivateRoute>
        }
      />
      <Route
        path="/manage-account"
        element={
          <PrivateRoute>
            <AccountManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/:id"
        element={
          <PrivateRoute>
            <PatientDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* Route 404 */}
      <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
    </Routes>
  );
}
