import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

import { useStore } from "../store/stored";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { currentUser, setCurrentUser } = useStore(state => state)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} 
    </AuthContext.Provider>
  );
};