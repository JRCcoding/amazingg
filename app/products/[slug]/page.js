/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import './products.css'
import Navbar from '@/app/components/Navbar'
import Carousel from 'react-bootstrap/Carousel'
const Page = () => {
  const router = useRouter()
  const currentURL = typeof window !== 'undefined' ? window.location.href : ''
  const url = new URL(currentURL)
  const path = url.pathname
  const pathSegments = path.split('/')
  const productURL = pathSegments[pathSegments.length - 1].replace(/%20/g, ' ')
  const [product, setProduct] = useState([])
  const [productFailed, setProductFailed] = useState(false)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Product URL:', productURL) // Log productURL for debugging

        const productsRef = collection(db, 'products')
        const querySnapshot = await getDocs(
          query(
            productsRef,
            where('title', '==', productURL)
            // limit(1) // Limit the query to retrieve only one result
          )
        )

        console.log('Query Snapshot:', querySnapshot.docs) // Log the query results for debugging

        if (querySnapshot.docs.length > 0) {
          const productData = querySnapshot.docs[0].data()
          setProduct(productData)
          console.log('Fetched Product:', productData) // Log the fetched product for debugging
        } else {
          console.log('No product found with the specified title.')
          setProductFailed(true)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [productURL])

  useEffect(() => {
    const setProductFoo = async () => {
      if (productFailed) {
        const productsRef = collection(db, 'products')
        const querySnapshot = await getDocs(
          query(productsRef, where('title', '==', productURL))
        )
        const productData = querySnapshot.docs[0].data()

        setProduct(productData)
      }
      setProductFoo()
    }
  }, [])

  const [qty, setQty] = useState(1)
  const addToCart = () => {
    const cartItem = {
      product,
      qty,
    }

    // Retrieve the existing cart data from localStorage
    const existingCartDataString = localStorage.getItem('cart')
    let existingCartData = []

    // Check if there's existing cart data
    if (existingCartDataString) {
      // Parse the existing cart data from JSON string to an array
      existingCartData = JSON.parse(existingCartDataString)
    }

    // Make sure existingCartData is an array (initialize as an empty array if it's not)
    if (!Array.isArray(existingCartData)) {
      existingCartData = []
    }

    // Add the new item to the cart
    existingCartData.push(cartItem)

    // Convert the updated cart data (array) back to a JSON string
    const updatedCartDataString = JSON.stringify(existingCartData)

    // Store the updated cart data in localStorage
    localStorage.setItem('cart', updatedCartDataString)

    // Now you have the updated cart data in localStorage
    console.log('Updated Cart:', existingCartData)
    router.push('/cart')
  }

  return (
    <main>
      <Navbar />
      {product ? (
        <div className='product-container'>
          <div className='product-title'>{product.title}</div>
          <div className='carousel'>
            <Carousel>
              {product.images &&
                product.images.map((image, index) => (
                  <Carousel.Item key={index} className='carousel-item'>
                    <img
                      src={image}
                      alt={product.title}
                      className='carousel-image'
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <select
            className='qty-dropdown'
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button type='button' className='button' onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      ) : (
        <>Loading...</>
      )}
    </main>
  )
}

export default Page
