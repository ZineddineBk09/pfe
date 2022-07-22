import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
const Footer = dynamic(() => import('../../components/Footer'))
const Header2 = dynamic(() => import('../../components/Header2'))
const ProductsCategories = dynamic(() =>
  import('../../components/ProductsCategories')
)
const ImagesSlider = dynamic(() => import('../../components/ImagesSlider'))

export default function Home({}) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://zino-products-api.herokuapp.com/categories'
      )
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div className='relative flex flex-col bg-gray-100 bg-no-repeat min-h-screen w-screen object-cover overflow-y-auto overflow-x-hidden'>
      <Header2 />
      <ImagesSlider />
      <ProductsCategories categories={categories} />
      <Footer />
    </div>
  )
}
