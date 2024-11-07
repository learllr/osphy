import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import Home from "./components/public/Home.jsx";
import Login from "./components/authentification/Login.jsx";
import Signup from "./components/authentification/Signup.jsx";
import Patients from "./components/private/Patients.jsx";
import Schedule from "./components/private/Schedule.jsx";
import AccountManagement from "./components/public/AccountManagement.jsx";
import PatientDetails from "./components/private/PatientElements/PatientDetails.jsx";
import Settings from "./components/private/Settings.jsx";
import Contact from "./components/public/Contact.jsx";
import About from "./components/public/About.jsx";
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/formules" element={<PricingPlans />} />
        <Route path="/formules/classique" element={<PricingPlans planType="classic" />} />
        <Route path="/formules/premium" element={<PricingPlans planType="premium" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
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
      </Routes>

      <div className="fixed bottom-2 left-2 bg-black text-white text-xs p-2 rounded-md">
        <span className="block sm:hidden">MOBILE (sm)</span>
        <span className="hidden sm:block md:hidden">TABLETTE (md)</span>
        <span className="hidden md:block">ORDI (lg)</span>
      </div>
    </Router>
  );
}
