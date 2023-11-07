'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import './components.css'
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs'
import { db, auth } from '../../firebase'
import { useRouter } from 'next/navigation'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

const Navbar = () => {
  const [search, setSearch] = useState('Search...')

  const [openDropdown, setOpenDropdown] = useState(null)

  const [isMobile, setIsMobile] = useState(false)

  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (window.innerWidth <= 501) {
      setIsMobile(true)
    }
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user)
      if (user) {
        // Check if the user already exists in the database based on the "id" property
        const usersRef = collection(db, 'users')
        const querySnapshot = await getDocs(
          query(usersRef, where('id', '==', user.uid))
        )

        if (querySnapshot.empty) {
          // User doesn't exist in the database, so create a new record
          const timestamp = new Date()

          try {
            await addDoc(usersRef, {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber || null,
              photoURL: user.photoURL,
              createdAt: timestamp.toLocaleString(),
            })
            console.log('USER created.')
          } catch (error) {
            console.error(`Error creating USER in Firebase: ${error}`)
          }
        } else {
          const usersRef = collection(db, 'users')
          const snapshot = await getDocs(
            query(usersRef, where('id', '==', user.uid))
          )
          setUser(snapshot.docs[0].data())
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  /* USER FUNCTIONS */
  const handleSignOut = async () => {
    await auth.signOut()
    window.location.reload()
  }

  const handleLogin = () => {
    router.push('/login')
  }

  /* NAVBAR FUNCTIONS */
  const handleDropdownToggle = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(dropdownName)
    }
  }

  /* SEARCH FUNCTIONS */
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
  const [isHome, setIsHome] = useState(false)
  useEffect(() => {
    if (window.location.pathname === '/') {
      setIsHome(true)
    }
  }, [])
  return (
    <>
      <nav>
        <Image
          src='/logo_v1_transparent.png'
          alt='Amazing G'
          className='title'
          width={500}
          height={150}
          onClick={() => router.push('/')}
        />

        <div className='search-container'>
          <input
            type='search'
            name='search'
            value={search}
            defaultValue={search}
            className='search-bar'
            onFocus={handleInputFocus}
            onBlur={handleInputAbort}
            autoComplete='off'
          />
        </div>
      </nav>
      <div className='links-container'>
        <ul className='links-list'>
          <li
            onClick={() => {
              handleDropdownToggle(null)
              router.push('/')
            }}
          >
            Home
          </li>
          {/* <li onClick={() => handleDropdownToggle('Women')}>Women</li>

          <li onClick={() => handleDropdownToggle('Men')}>Men</li>
          <li onClick={() => handleDropdownToggle('Kids')}>Kids</li> */}
          {/* <li onClick={() => handleDropdownToggle('Sports')}>Sports</li>
          <li onClick={() => handleDropdownToggle('Tech')}>Tech</li>
          <li
            style={{ color: 'green', fontWeight: 'bold' }}
            onClick={() => handleDropdownToggle('Green')}
            // hidden={isMobile}
          >
            GREEN
          </li> */}
          <li onClick={() => router.push('/categories/Clothing')}>Clothing</li>
          <li onClick={() => router.push('/categories/Tech')}>Tech</li>
          <div>
            <li>
              {' '}
              {!user ? (
                <div className='mobile-icon'>
                  <BsFillPersonFill onClick={handleLogin} />
                </div>
              ) : (
                <div
                  className='mobile-icon'
                  onClick={() => handleDropdownToggle('Profile')}
                >
                  <Image
                    src={user.photoURL}
                    alt={user.name}
                    height={17.5}
                    width={17.5}
                    className='photoURL'
                  />
                </div>
              )}
            </li>
          </div>
        </ul>
        {/* {openDropdown === 'Women' && (
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
        {openDropdown === 'Green' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Solar</li>
            <li className='dropdown-item'>Green Cleaning</li>
            <li className='dropdown-item'>Organic Farming</li>
          </ul>
        )}
        {openDropdown === 'Clothing' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Men</li>
            <li className='dropdown-item'>Women</li>
            <li className='dropdown-item'>Kids</li>
          </ul>
        )}
        {openDropdown === 'Other' && (
          <ul className='dropdown'>
            <li className='dropdown-item'>Toys</li>
            <li className='dropdown-item'>Green Cleaning</li>
            <li className='dropdown-item'>Organic Farming</li>
          </ul>
        )} */}
        {openDropdown === 'Profile' && (
          <ul className='dropdown'>
            <li className='dropdown-item' onClick={() => router.push('/cart')}>
              Cart
            </li>
            <li className='dropdown-item'>Orders</li>
            <li className='dropdown-item' onClick={handleSignOut}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default Navbar
