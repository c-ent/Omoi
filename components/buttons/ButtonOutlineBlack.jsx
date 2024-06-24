import React from 'react'

const ButtonOutlineBlack = ({text}) => {
  return (
    <button className='bg-white border-black border-2 rounded-full px-10 py-1 text-xl font-semibold text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white'>
        <span>{text}</span>
    </button>
  )
}

export default ButtonOutlineBlack