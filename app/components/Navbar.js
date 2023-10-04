'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import './components.css'
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs'

const Navbar = () => {
  const [search, setSearch] = useState('Search...')

  const [openDropdown, setOpenDropdown] = useState(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 501) {
      setIsMobile(true)
    }
  }, [])

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
        <div className='icons' hidden={isMobile}>
          <BsFillCartFill className='icon' />
          <BsFillPersonFill className='icon' />
        </div>
      </nav>
      <div className='links-container'>
        <ul className='links-list'>
          <li onClick={() => handleDropdownToggle(null)} hidden={isMobile}>
            Home
          </li>
          <li onClick={() => handleDropdownToggle('Women')}>Women</li>

          <li onClick={() => handleDropdownToggle('Men')}>Men</li>
          <li onClick={() => handleDropdownToggle('Jewelry')}>Jewelry</li>
          <li onClick={() => handleDropdownToggle('Sports')}>Sports</li>
          <li onClick={() => handleDropdownToggle('Tech')}>Tech</li>
          <li
            style={{ color: 'green', fontWeight: 'bold' }}
            onClick={() => handleDropdownToggle('Green')}
            hidden={isMobile}
          >
            GREEN
          </li>
          <div hidden={!isMobile}>
            <li>
              {' '}
              <div className='mobile-icon'>
                <BsFillPersonFill />
              </div>
            </li>
          </div>
        </ul>
        {openDropdown === 'Women' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Tops</li>
            <li className='dropdown-item'>Bottoms</li>
            <li className='dropdown-item'>Outfits</li>
            <li className='dropdown-item'>Shoes</li>
            <li className='dropdown-item'>Jewelry</li>
          </ul>
        )}
        {openDropdown === 'Men' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Tops</li>
            <li className='dropdown-item'>Bottoms</li>
            <li className='dropdown-item'>Outfits</li>
            <li className='dropdown-item'>Shoes</li>
            <li className='dropdown-item'>Accessories</li>
          </ul>
        )}
        {openDropdown === 'Jewelry' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Mens</li>
            <li className='dropdown-item'>Womens</li>
            <li className='dropdown-item'>Children</li>
          </ul>
        )}
        {openDropdown === 'Sports' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Baseball</li>
            <li className='dropdown-item'>Football</li>
            <li className='dropdown-item'>Basketball</li>
            <li className='dropdown-item'>Volleyball</li>
            <li className='dropdown-item'>Tennis</li>
          </ul>
        )}
        {openDropdown === 'Tech' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Gadgets</li>
            <li className='dropdown-item'>Chargers</li>
            <li className='dropdown-item'>Screens</li>
            <li className='dropdown-item'>Tablets</li>
            <li className='dropdown-item'>Other</li>
          </ul>
        )}
        {openDropdown === 'Green' && <ul className='dropdown'></ul>}
      </div>
    </>
  )
}

export default Navbar
