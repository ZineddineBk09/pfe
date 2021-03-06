import React from 'react'
const CategoriesFilter2 = dynamic(() =>
  import('../../../../components/CategoriesFilter2')
)
const Header2 = dynamic(() => import('../../../../components/Header2'))
const Footer = dynamic(() => import('../../../../components/Footer'))
const ProductsCategories = dynamic(() =>
  import('../../../../components/ProductsCategories')
)
const ImagesSlider = dynamic(() =>
  import('../../../../components/ImagesSlider')
)

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const CategoryId = ({ products, categories }) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'
    >
      <Header2 />
      <CategoriesFilter2 categories={categories} />
      <ImagesSlider />
      <ProductsCategories categories={categories} />
      <Footer />
    </motion.div>
  )
}

export default CategoryId
//getting URL params
export async function getServerSideProps(context) {
  const { params, req } = context

  let category = {}

  try {
    const response = await fetch(
      `http://${req.headers.host}/api/categories/categoryById`,
      {
        method: 'POST',
        body: JSON.stringify({
          categoryId: params.categoryId,
        }),
      }
    )
    await response.json().then((data) => {
      category = data
    })
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      categories: category.subCategories,
    },
  }
}
