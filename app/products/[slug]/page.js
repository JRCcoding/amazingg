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
          <button type='button' className='button'>
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
