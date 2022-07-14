import React from 'react'
import { NavLink } from 'react-router-dom'

const isNotActiveStyle = 'flex items-center px-3 py-2 gap-3 font-semibold text-base text-white transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-3 py-2 gap-3 font-semibold text-base text-secondaryColor-100 transition-all duration-200 ease-in-out capitalize'

const NavMenu = ({ closeToggle }) => {
  const handleCloseSideBar = () => { 
    if (closeToggle) closeToggle(false)
  }

  return (
    <ul className="flex flex-col md:flex-row">
      <li>
        <NavLink 
          to="/"
          onClick={handleCloseSideBar}
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/movies"
          onClick={handleCloseSideBar}
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}  
        >
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/tv_shows"
          onClick={handleCloseSideBar}
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
        >
          TV Shows
        </NavLink>
      </li>
    </ul>
  )
}

export default NavMenu