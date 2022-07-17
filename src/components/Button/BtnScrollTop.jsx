import React from 'react'

import { MdOutlineKeyboardArrowUp } from 'react-icons/md'

const BtnScrollTop = ({ scrollTop }) => {
  return (
    <div 
        className='fixed bottom-20 right-5 flex justify-center items-center cursor-pointer z-10 w-12 h-12 bg-secondaryColor-100 opacity-70 text-md text-white rounded-full outline-none'
        onClick={scrollTop}  
      >
        <MdOutlineKeyboardArrowUp fontSize={30} />
      </div>
  )
}

export default BtnScrollTop