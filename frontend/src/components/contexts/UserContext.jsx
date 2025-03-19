import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig.js";
import LoadingScreen from "../common/Loading/LoadingScreen.jsx";
import { useMessageDialog } from "./MessageDialogContext.jsx";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showMessage } = useMessageDialog();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      queryClient.prefetchQuery("userProfile", fetchUserProfile);
    } else {
      setIsLoading(false);
    }
  }, [queryClient]);

  const { data: userProfile, isLoading: queryLoading } = useQuery(
    "userProfile",
    fetchUserProfile,
    {
      enabled: !!localStorage.getItem("token"),
      onSuccess: (data) => {
        setUser(data);
        setIsAuthenticated(true);
        setIsLoading(false);
      },
      onError: (error) => {
        handleUnauthorized(error.response?.status);
        logoutUser();
        setIsLoading(false);
      },
    }
  );

  async function fetchUserProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const handleUnauthorized = (status) => {
    if (status === 403 || status === 401) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const signupUser = async (userData) => {
    try {
      const response = await axios.post("/authentification/signup", userData);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      queryClient.invalidateQueries("userProfile");
      showMessage("success", "Inscription réussie !");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.error || "Erreur lors de l'inscription";
      showMessage("error", message);
      return { success: false, message };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/authentification/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      queryClient.invalidateQueries("userProfile");
      navigate("/patients");
      showMessage("success", "Connexion réussie !");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.error || "Erreur lors de la connexion";
      showMessage("error", message);
      setIsAuthenticated(false);
      return { success: false, message };
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("/authentification/logout");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      queryClient.clear();
      navigate("/");
      showMessage("success", "Déconnexion réussie !");
    } catch (error) {
      showMessage("error", "Erreur lors de la déconnexion");
    }
  };

  if (isLoading || queryLoading) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider
      value={{
        user: userProfile || user,
        isAuthenticated,
        signupUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
