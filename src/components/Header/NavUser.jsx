import React, { useState } from 'react'
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NavUser = ({ currentUser }) => {
  const [userHovered, setUserHovered] = useState(false)
  const logout = () => {
    signOut(auth)
  }

  return (
    <div
      onClick={() => setUserHovered(!userHovered)} 
      className="relative flex items-center cursor-pointer">
      <img alt="avatar" src={currentUser.photoURL} className='w-10 h-10 object-cover rounded-full' />
      
      {userHovered && (
        <ul className="absolute top-11 right-0 bg-[#333] border border-slate-600 rounded-md transition-all duration-200 ease-in-out z-10 w-150 text-left">
          <li className="text-center cursor-pointer px-4 py-2 rounded-t-md">{currentUser.displayName}</li>
          <li className="flex items-center cursor-pointer px-4 py-2 hover:bg-[#222] hover:text-secondaryColor-100 font-semibold">
            <Link to='/favorites'>Favorites movie</Link>
          </li>
          <li className="flex items-center cursor-pointer px-4 py-2 hover:bg-[#222] hover:text-secondaryColor-100 rounded-b-md font-semibold" onClick={logout}>
            Log out
            <FiLogOut className='ml-2' fontSize={16} />
          </li>
        </ul>
      )}
    </div>
  )
}

export default NavUser