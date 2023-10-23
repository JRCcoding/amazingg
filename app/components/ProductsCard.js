import React from 'react'
import { Image } from 'react-bootstrap'

const ProductsCard = ({ products }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15,
      }}
    >
      {products &&
        products.map((product, index) => (
          <div key={index}>
            <h3>{product.title}</h3>
            <Image
              src={product.images[0]}
              alt={product.title}
              style={{ width: '150px', height: 'auto' }}
            />
          </div>
        ))}
    </div>
  )
}

export default ProductsCard
