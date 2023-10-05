'use client'

import { Image } from 'react-bootstrap'
import React from 'react'
import Login from '../components/Login'
import './styles.css'

const page = () => {
  return (
    <div className='container'>
      <div className='card'>
        <Image
          src='/logo_v1_transparent.png'
          alt='Amazing G'
          className='title-image'
        />

        <Login className='login-box' />
      </div>
    </div>
  )
}

export default page
