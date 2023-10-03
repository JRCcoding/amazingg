'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import './components.css'
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs'

const Navbar = () => {
  const [search, setSearch] = useState('Search...')

  const [openDropdown, setOpenDropdown] = useState(null)

  const handleDropdownToggle = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(dropdownName)
    }
  }

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
          <li onClick={() => handleDropdownToggle(null)}>Home</li>
          <li onClick={() => handleDropdownToggle('Women')}>Women</li>

          <li onClick={() => handleDropdownToggle('Men')}>Men</li>
          <li onClick={() => handleDropdownToggle('Jewelry')}>Jewelry</li>
          <li onClick={() => handleDropdownToggle('Sports')}>Sports</li>
          <li onClick={() => handleDropdownToggle('Tech')}>Tech</li>
          <li
            style={{ color: 'green', fontWeight: 'bold' }}
            onClick={() => handleDropdownToggle('Green')}
          >
            GREEN
          </li>
        </ul>
        {openDropdown === 'Women' && (
          <ul className='dropdown'>
            <li>Tops</li>
            <li>Bottoms</li>
            <li>Outfits</li>
            <li>Shoes</li>
            <li>Jewelry</li>
          </ul>
        )}
        {openDropdown === 'Men' && (
          <ul className='dropdown'>
            <li>Tops</li>
            <li>Bottoms</li>
            <li>Outfits</li>
            <li>Shoes</li>
            <li>Accessories</li>
          </ul>
        )}
        {openDropdown === 'Jewelry' && (
          <ul className='dropdown'>
            <li>Mens</li>
            <li>Womens</li>
            <li>Children</li>
          </ul>
        )}
        {openDropdown === 'Sports' && (
          <ul className='dropdown'>
            <li>Baseball</li>
            <li>Football</li>
            <li>Basketball</li>
            <li>Volleyball</li>
            <li>Tennis</li>
          </ul>
        )}
        {openDropdown === 'Tech' && (
          <ul className='dropdown'>
            <li>Gadgets</li>
            <li>Chargers</li>
            <li>Screens</li>
            <li>Tablets</li>
            <li>Other</li>
          </ul>
        )}
        {openDropdown === 'Green' && (
          <ul className='dropdown'>
            <li>Tops</li>
            <li>Bottoms</li>
            <li>Outfits</li>
            <li>Shoes</li>
            <li>Jewelry</li>
          </ul>
        )}
      </div>
    </>
  )
}

export default Navbar
