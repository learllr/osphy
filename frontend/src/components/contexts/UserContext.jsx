import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/api/user/profile`, {
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

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      return { success: true };
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
        `${BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/all`, {
        withCredentials: true,
      });
      setUsers(response.data);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Erreur lors de la récupération des utilisateurs",
      };
    }
  };

  const addUser = async (newUserData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/add`,
        newUserData,
        {
          withCredentials: true,
        }
      );
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Erreur lors de l'ajout de l'utilisateur",
      };
    }
  };

  const updateUser = async (id, newUserData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/update/${id}`,
        newUserData,
        {
          withCredentials: true,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data.user : user))
      );
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Erreur lors de la mise à jour de l'utilisateur",
      };
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/user/delete/${id}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Erreur lors de la suppression de l'utilisateur",
      };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        isAuthenticated,
        setUsers,
        loginUser,
        logoutUser,
        fetchAllUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};