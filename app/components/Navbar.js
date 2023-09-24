import Image from 'next/image'
import React from 'react'
import './components.css'

const Navbar = () => {
  return (
    <nav>
      <Image
        src='/amazingg_logo_transparent.png'
        alt='Amazing G'
        className='title'
        width={256}
        height={160}
        style={{ position: 'absolute', marginTop: 1 }}
      />
      <div></div>
      <div className='links-container'>
        <ul className='links-list'>
          <li>Home</li>
          <li></li>
        </ul>
        <ul className='links-list-2'>
          <li>Search</li>
        </ul>
      </div>
      <div className='icons'>
        <span>S</span>
        <span>L</span>
      </div>
    </nav>
  )
}

export default Navbar
