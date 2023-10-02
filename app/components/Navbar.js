'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import './components.css'
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs'

const Navbar = () => {
  const [search, setSearch] = useState('Search...')

  const handleInputFocus = () => {
    if (search === 'Search...') {
      setSearch('')
    }
  }

  const handleInputAbort = () => {
    if (search === '') {
      setSearch('Search...')
    }
  }
  return (
    <>
      <nav>
        <Image
          src='/logo_v1_transparent.png'
          alt='Amazing G'
          className='title'
          width={500}
          height={150}
        />

        <div className='search-container'>
          <input
            type='text'
            name='search'
            value={search}
            defaultValue={search}
            className='search-bar'
            onFocus={handleInputFocus}
            onBlur={handleInputAbort}
          />
        </div>
        <div className='icons'>
          <BsFillCartFill className='icon' />
          <BsFillPersonFill className='icon' />
        </div>
      </nav>
      <div className='links-container'>
        <ul className='links-list'>
          <li>Home</li>
          <li>Women</li>
          <li>Men</li>
          <li>Jewelry</li>
          <li>Sports</li>
          <li>Tech</li>
          <li style={{ color: 'green', fontWeight: 'bold' }}>GREEN</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
