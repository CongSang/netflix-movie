import React from 'react'
import { useStore } from "../store/stored"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const currentUser = useStore((state) => state.currentUser)
  const location = useLocation()

  if (!currentUser) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    )
  }

  return <>{children}</>
}

export default PrivateRoute