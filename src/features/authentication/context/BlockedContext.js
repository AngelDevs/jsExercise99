import React, { useState, useEffect, useContext, createContext } from "react";

import User from "../entities/user";
import { AuthContext } from "./AuthContext";

export const BlockedContext = createContext();

export const BlockedProvider = ({ children }) => {
  const [value, setValue] = useState({});
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const isBlocked = JSON.parse(sessionStorage.getItem("blocked"));
    console.log(isBlocked);
    setBlocked(isBlocked);
  }, []);

  useEffect(() => {
    if (blocked === true) {
      sessionStorage.setItem("blocked", JSON.parse(blocked));
    }
  }, [blocked]);

  useEffect(() => {
    setValue({
      blocked,
      setBlocked,
    });
  }, [blocked]);

  return (
    <BlockedContext.Provider value={value}>{children}</BlockedContext.Provider>
  );
};
