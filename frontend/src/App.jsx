import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/plans/:bar" element={<Plans />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}

        {/* Route 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

        {/* Routes protégées */}
        {/* <Route path="/lessons" element={<Lessons />} />
          <Route
            path="/manage-account"
            element={
              <PrivateRoute>
                <AccountManagement />
              </PrivateRoute>
            }
          /> */}
      </Routes>
    </Router>
  );
}
