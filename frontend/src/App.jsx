import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import Home from "./components/public/Home.jsx";
import Login from "./components/authentification/Login.jsx";
import Signup from "./components/authentification/Signup.jsx";
import Dashboard from "./components/private/Dashboard.jsx";
import Patients from "./components/private/Patients.jsx";
import Schedule from "./components/private/Schedule.jsx";
import AccountManagement from "./components/public/AccountManagement.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/plans/:bar" element={<Plans />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Route 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
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
      </Routes>
    </Router>
  );
}
