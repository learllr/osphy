import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { AlertProvider } from "./components/contexts/AlertContext.jsx";
import { UserProvider } from "./components/contexts/UserContext.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </UserProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
