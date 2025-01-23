import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig.js";
import LoadingScreen from "../common/Loading/LoadingScreen.jsx";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
        console.error("Erreur lors de la récupération du profil :", error);
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
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Erreur lors de l'inscription",
      };
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
      return { success: true, message: "Connexion réussie !" };
    } catch (error) {
      setIsAuthenticated(false);
      return {
        success: false,
        message: error.response?.data?.error || "Erreur lors de la connexion",
      };
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
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
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
