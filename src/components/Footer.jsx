import React from 'react'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="bg-primary-100 flex flex-row justify-between items-center py-3.5 px-4">
      <p className="text-white cursor-default hover:text-secondaryColor-100">Ho Nguyen Cong Sang &copy; 2022</p>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p className="flex flex-row justify-between items-center">
          <a 
            target="_blank" 
            rel="noreferrer" 
            href="https://github.com/CongSang"
            className='text-white ml-3 hover:text-gray-300'
          >
            <AiFillGithub fontSize={34} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/congsang.honguyen"
            className='text-[#2D88FF] ml-2'
          >
            <AiFillFacebook fontSize={34} />
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer