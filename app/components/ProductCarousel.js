'use client'

import Image from 'next/image'
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Hat from '../../public/products/hat.webp'
import Shirt from '../../public/products/shirt.webp'
import './components.css'

const ProductCarousel = () => {
  return (
    <div className='carousel'>
      <Carousel controls={false}>
        <Carousel.Item className='carousel-item'>
          <Image src={Shirt} alt='Shoes' className='carousel-image' />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item className='carousel-item'>
          <Image src={Hat} alt='Perfume' className='carousel-image' />
          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        {/* <Carousel.Item>
          <ExampleCarouselImage text='Third slide' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </div>
  )
}

export default ProductCarousel
