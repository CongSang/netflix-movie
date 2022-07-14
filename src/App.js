import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Home from './container/Home'
import { AuthProvider } from './components/AuthProvider'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Home />}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
