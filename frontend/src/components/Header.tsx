import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-center items-center p-4 bg-green-100 text-white'>
        <img src="/findmy-logo.png" alt="logo" className='max-w-48'/>
        <h1 className='text-teal-700 text-5xl pl-3'>Devices</h1>
    </div>
  )
}

export default Header