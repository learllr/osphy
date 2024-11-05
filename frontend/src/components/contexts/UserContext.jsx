import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../../axiosConfig.js";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const signupUser = async (userData) => {
    try {
      const response = await axios.post("/authentification/signup", userData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Erreur lors de l'inscription de l'utilisateur",
      };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "/authentification/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      return { success: true, message: "Connexion réussie !" };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setIsAuthenticated(false);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Erreur lors de la connexion de l'utilisateur",
      };
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(
        "/authentification/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
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
