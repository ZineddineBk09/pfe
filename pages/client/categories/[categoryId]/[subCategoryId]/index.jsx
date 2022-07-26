import React, { useEffect, useState } from 'react'
const Body = dynamic(() => import('../../../../../components/HomeBody'))
const CategoriesFilter2 = dynamic(() =>
  import('../../../../../components/CategoriesFilter2')
)
const Header2 = dynamic(() => import('../../../../../components/Header2'))
const Footer = dynamic(() => import('../../../../../components/Footer'))
const ProductsCategories = dynamic(() =>
  import('../../../../../components/ProductsCategories')
)
const ImagesSlider = dynamic(() =>
  import('../../../../../components/ImagesSlider')
)
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const CategoryId = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    console.log('FETCHING ...')

    const fetchCategoriesAndProducts = async () => {
      //get the subcategory and category from the page url
      const categoryId = window.location.href.split('/')[5]
      const subCategoryId = window.location.href.split('/')[6]

      let category = {}
      let subCategory = {}

      try {
        const response1 = await fetch(`/api/categories/categoryById`, {
          method: 'POST',
          body: JSON.stringify({
            categoryId: categoryId,
          }),
        })
        await response1.json().then(async (data) => {
          //search the sub category in the category subCategories array
          subCategory = data.subCategories.filter(
            (subCategory) => subCategory.key === subCategoryId
          )
          setCategories(subCategory[0].subSubCategories)

          //check if we have only one sub sub category to display the productss
          if (subCategory[0].subSubCategories?.length === 1) {
            const response1 = await fetch(`/api/products/productsByCategory`, {
              method: 'POST',
              body: JSON.stringify({
                category: subCategoryId,
                page: 1,
              }),
            })
            await response1.json().then(async (data) => {
              setProducts(data)
            })
          }
          //if we have more than one sub sub category, we display the sub sub categories
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchCategoriesAndProducts()
  }, [])

  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
      <Header2 />
      <CategoriesFilter2 categories={categories} />
      {products.length == 0 && <ImagesSlider />}
      {categories.length > 1 && <ProductsCategories categories={categories} />}
      {products?.length > 0 && <Body products={products} />}

      <Footer />
    </motion.div>
  )
}

export default CategoryId
