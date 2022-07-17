import React from 'react'

const ButtonCustom = ({ content, className }) => {
  return (
    <span className={`py-1.5 px-2.5 border-2 border-solid border-white rounded-full text-base ${className}`}>{content}</span>
  )
}

export default ButtonCustom