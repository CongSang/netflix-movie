import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"

import { useStore } from "../store/stored"
import { fetchMovieFavorite } from "../data/database"
import Spinner from "./Spinner"

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { currentUser, setCurrentUser, setFavoriteList } = useStore(state => state)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)

        const newFavoriteList = await fetchMovieFavorite(user.uid)
        setFavoriteList(newFavoriteList)

        return
      }

      setCurrentUser(null)
      setFavoriteList([])

      return () => {
        unsub()
      }
    })
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} 
    </AuthContext.Provider>
  );
};