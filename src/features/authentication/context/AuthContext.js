import React, { useState, useEffect, createContext } from "react";
import authService from "../services/authentication";
import User from "../entities/user";
import {
  UNAUTHORIZED_ERROR,
  UNEXPECTED_ERROR,
} from "../../../helpers/errorHandler";
import { useHistory } from "react-router";
import { loginRoute } from "../../../pages/routes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [value, setValue] = useState({});

  useEffect(() => {
    const userJson = JSON.parse(localStorage.getItem("user"));

    if (userJson) {
      const user = User.fromJson(userJson);
      console.log(user);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    setValue({
      currentUser,
      signUp,
      logout,
      loading,
    });
    setLoading(false);
  }, [currentUser, loading]);

  const signUp = async (username, password) => {
    const response = await authService.signUp(username, password);

    if (
      response.error === UNAUTHORIZED_ERROR ||
      response.error === UNEXPECTED_ERROR
    ) {
      return response;
    }
    response["responseObject"]["username"] = username;
    const user = User.fromJson(response);
    localStorage.setItem("user", JSON.stringify(response));
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
