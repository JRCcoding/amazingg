'use client'
import React, { useState, useEffect } from 'react'
import './cart.css'
import Navbar from '../components/Navbar'
import '../components/components.css'

const Page = () => {
  const [cart, setCart] = useState(null)
  const [cartTotal, setCartTotal] = useState(null)
  useEffect(() => {
    const existingCartDataString = localStorage.getItem('cart')
    const existingCartData = JSON.parse(existingCartDataString)
    setCart(existingCartData)
  }, [])
  const removeItem = (index) => {
    const updatedCart = [...cart]

    if (index >= 0 && index < updatedCart.length) {
      updatedCart.splice(index, 1)
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  // useEffect(() => {
  //   setCartTotal(
  //     cart.reduce((total, item) => total + item.product.price * item.qty, 0)
  //   )
  // }, [cart])
  return (
    <main>
      <Navbar />
      <div className='cart-container'>
        <h1>Cart</h1>
        {cart &&
          cart.map((item, index) => (
            <div className='cart-item' key={index}>
              <div className='cart-item-info'>
                <p>
                  {item.qty} x {item.product.title}
                  {item.flavor ? ` (${item.flavor})` : ''}
                </p>
                <p>{item.product.flavor}</p>
                {/* <Image
                    height={50}
                    width={50}
                    src={item.product.price}
                    alt='test' 
                  />*/}
              </div>
              <div className='cart-item-price'>
                = ${item.product.price * item.qty}
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    color: 'red',
                  }}
                >
                  X
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}

export default Page
