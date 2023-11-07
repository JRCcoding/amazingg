'use client'
import React, { useState, useEffect } from 'react'
import './cart.css'
import Navbar from '../components/Navbar'
import '../components/components.css'
import { PayPalButton } from 'react-paypal-button-v2'

const Page = () => {
  const [cart, setCart] = useState(null)
  const [cartTotal, setCartTotal] = useState(null)
  const [hideCheckout, setHideCheckout] = useState(true)

  const taxRate = 0.0825 // Set your desired tax rate (10% in this example)

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

  useEffect(() => {
    if (cart) {
      const subtotal = cart.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      )
      const tax = subtotal * taxRate
      const totalWithTax = subtotal + tax
      setCartTotal({
        subtotal,
        tax: tax.toFixed(2),
        totalWithTax: totalWithTax.toFixed(2),
      })
    }
  }, [cart])

  return (
    <main>
      <Navbar />
      <div className='cart-container'>
        <h1 style={{ textAlign: 'center' }}>Cart</h1>
        {cart &&
          cart.map((item, index) => (
            <div className='cart-item' key={index}>
              <div className='cart-item-info'>
                <p>
                  {item.qty} x {item.product.title}
                  {item.flavor ? ` (${item.flavor})` : ''}
                </p>
                <p>{item.product.flavor}</p>
              </div>
              <div className='cart-item-price'>
                &nbsp;= ${item.product.price * item.qty}
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
      <div className='cart-totals'>
        {cartTotal && (
          <div className='cart-totals'>
            <div className='cart-total-item'>
              <h3>Subtotal:</h3>
              <span>${cartTotal.subtotal}</span>
            </div>
            <div className='cart-total-item'>
              <h3>Tax:</h3>
              <span>${cartTotal.tax}</span>
            </div>
            <div className='cart-total-item'>
              <h3>Total:</h3>
              <span>
                <strong>${cartTotal.totalWithTax}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
      {hideCheckout === true ||
        (cartTotal?.totalWithTax !== 0.0 && (
          <button
            style={{
              background: 'black',
              color: 'white',
              borderRadius: 0,
              border: 'none',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={() => setHideCheckout(!hideCheckout)}
          >
            Checkout
          </button>
        ))}
      <div
        hidden={hideCheckout}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form>
          <p>Get shipping information here...</p>
        </form>
        <PayPalButton price={cartTotal} />
      </div>
    </main>
  )
}

export default Page
