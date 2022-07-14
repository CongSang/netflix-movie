import React from 'react'
import { Rings } from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-primary-100 flex flex-col justify-center items-center w-full h-screen'>
        <Rings
          color='#fd6f71'
          height={50}
          width={100}
          className='m-5'
        />

        <p className='text-md text-center px-2 text-white'>{message}</p>
    </div>
  )
}

export default Spinner