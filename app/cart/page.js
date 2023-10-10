'use client'
import React, { useState, useEffect } from 'react'
import './cart.css'
import Navbar from '../components/Navbar'
import '../components/components.css'

const Page = () => {
  return (
    <main>
      <Navbar />
      <div className='cart-container'>
        <h1>Cart</h1>
      </div>
    </main>
  )
}

export default Page
