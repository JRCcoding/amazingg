/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Hat from '../../public/products/hat.webp'
import Shirt from '../../public/products/shirt.webp'
import './components.css'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const ProductCarousel = () => {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products')
      const querySnapshot = await getDocs(productsRef)

      const productsData = querySnapshot.docs.map((doc) => doc.data())
      setProducts(productsData)
    }

    fetchProducts()
  }, [])

  const router = useRouter()

  return (
    <div className='carousel'>
      <Carousel controls={false}>
        {products &&
          products.map((product, index) => (
            <Carousel.Item
              className='carousel-item'
              key={index}
              onClick={() => router.push(`/products/${product.title}`)}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className='carousel-image'
              />
              {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  )
}

export default ProductCarousel
