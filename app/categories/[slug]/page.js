'use client'
import Navbar from '@/app/components/Navbar'
import ProductsCard from '@/app/components/ProductsCard'
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'

const Page = () => {
  const [category, setCategory] = React.useState(null)
  const [products, setProducts] = React.useState(null)
  React.useEffect(() => {
    const currentURL = typeof window !== 'undefined' ? window.location.href : ''
    const url = new URL(currentURL)
    const path = url.pathname
    const pathSegments = path.split('/')
    const categoryURL = pathSegments[pathSegments.length - 1]
    setCategory(categoryURL)
  }, [])

  React.useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products')
      const q = query(productsRef, where('category', '==', category)) // Define the query correctly

      try {
        const querySnapshot = await getDocs(q) // Use 'q' (the query) here
        const productsData = querySnapshot.docs.map((doc) => doc.data()) // Use 'map' to extract data from documents
        setProducts(productsData)
      } catch (error) {
        // Handle any errors here, such as logging or displaying an error message.
        console.error('Error fetching products: ', error)
      }
    }

    fetchProducts()
  }, [category])

  return (
    <div>
      <Navbar />
      <ProductsCard products={products} />
    </div>
  )
}

export default Page
