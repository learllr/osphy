import React from "react";
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

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* Routes protégées */}
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
    </Router>
  );
}
