import React from 'react'
import { Image } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

const ProductsCard = ({ products }) => {
  const router = useRouter()
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
          <div
            key={index}
            onClick={() => router.push(`/products/${product.title}`)}
          >
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
