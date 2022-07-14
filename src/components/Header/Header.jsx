import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'
import { IoIosCloseCircle, IoMdSearch } from 'react-icons/io'

import { useStore } from "../../store/stored";
import logo from '../../assets/logo-full.png'
import nlogo from '../../assets/logo.png'
import NavMenu from './NavMenu'
import NavUser from './NavUser'

const Header = ({ searchTerm, setSearchTerm, currentUser }) => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const navigate = useNavigate()
  const headerRef = useRef()

  useEffect(() => {
    const handleFixedHeader = () => {
      const header = headerRef.current
      const sticky = header.offsetTop

      if (header) {
        if (window.pageYOffset > sticky) {
          header.classList.add("bg-[#2f3640]")
          header.classList.remove("bg-transparent")
        } else {
          header.classList.remove("bg-[#2f3640]")
          header.classList.add("bg-transparent")

        }
      }
    }
    window.addEventListener("scroll", handleFixedHeader);
    return () => window.removeEventListener("scroll", handleFixedHeader);
  }, []);

  return (
    <div ref={headerRef} className='flex flex-row justify-between items-center text-white p-4 z-10 bg-transparent fixed top-0 left-0 right-0 w-full'>
      <div className="hidden md:flex justify-between items-center w-full">
        <div className="flex flex-row items-center transition-all duration-500 ease-in-out">
          <Link
            to="/"
            className='flex px-3 gap-2 w-190 items-center justify-center'
          >
            <img src={logo} alt="logo" className='w-full' />
          </Link>

          <div className='flex ml-4'>
            <NavMenu />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <div className='flex justify-start items-center lg:w-300 w-40 px-2 opacity-60 rounded-md bg-[#434a53] border-none outline-none focus-within:shadow-sm mr-5'>
            <IoMdSearch fontSize={21} className='ml-1' />
            <input 
              type='text'
              onChange={e => setSearchTerm(e.target.value)}
              placeholder='Search'
              value={searchTerm} 
              onFocus={() => navigate('/search')}
              className='p-2 w-full bg-[#434a53] outline-none'
            />
          </div>
          {currentUser ? (
            <NavUser currentUser={currentUser && currentUser} />
          ) : (
            <div className='px-4 py-2 bg-secondaryColor-100 rounded-md'>
              <Link
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex md:hidden flex-row items-center justify-between transition-all duration-200 ease-in-out w-full">
        <HiMenu fontSize={40} className="flex md:hidden cursor-pointer" onClick={() => setToggleSideBar(true)} />

        <Link
          to="/"
          className='flex px-3 gap-2 w-190 items-center justify-center'
        >
          <img src={logo} alt="logo" className='w-32' />
        </Link>
        <div>
          {currentUser ? (
            <NavUser currentUser={currentUser && currentUser} />
          ) : (
            <div className='px-4 py-2 bg-secondaryColor-100 rounded-md'>
              <Link
                to="/login"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
        {toggleSideBar && (
          <div className="fixed top-0 left-0 bottom-0 w-4/5 bg-primary-50 overflow-y-auto shadow-md animate-slide-in">
            <div className="absolute top-0 right-0 flex justify-end items-center p-2">
              <IoIosCloseCircle fontSize={30} className="cursor-pointer opacity-60" onClick={() => setToggleSideBar(!toggleSideBar)} />
            </div>

            <Link
              to="/"
              className='flex py-6 gap-2 w-40 items-center justify-center'
            >
              <img src={nlogo} alt="logo" className='w-full' />
            </Link>
            <div className='ml-2'>
              <NavMenu closeToggle={setToggleSideBar} />
            </div>
            <div className='flex items-center w-4/5 px-2 rounded-md bg-primary-100 border-none outline-none focus-within:shadow-sm mt-6 mx-4'>
              <IoMdSearch fontSize={21} className='ml-1' />
              <input 
                type='text'
                onChange={e => setSearchTerm(e.target.value)}
                placeholder='Search'
                value={searchTerm} 
                onFocus={() => navigate('/search')}
                className='p-2 w-full bg-primary-100 outline-none'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header