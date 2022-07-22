import React, { useEffect } from 'react'
const Body = dynamic(() => import('../../../../../components/HomeBody'))
const CategoriesFilter2 = dynamic(() =>
  import('../../../../../components/CategoriesFilter2')
)
const Header2 = dynamic(() => import('../../../../../components/Header2'))
const Footer = dynamic(() => import('../../../../../components/Footer'))


import { motion } from 'framer-motion'
import { unfilterProducts } from '../../../../../React-Context-Api/Actions/productsActions'

import dynamic from 'next/dynamic'
import { useStateValue } from '../../../../../React-Context-Api/context'

const CategoryId = ({ products, categories }) => {
  const [{}, dispatch] = useStateValue()
  useEffect(() => {
    dispatch(unfilterProducts())
  }, [])

  console.log('PRODUCTS : ', products)
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'
    >
      <Header2 />
      <CategoriesFilter2 categories={categories} />
      {products && <Body products={products} />}
      <Footer />
    </motion.div>
  )
}

export default CategoryId

//export async function getStaticPaths() {
//  const response = await fetch(
//    `https://zino-products-api.herokuapp.com/categories`
//  )
//  const data = await response.json()
//  const paths = data.map((category) => {
//    return {
//      params: {
//        categoryId: category.key,
//      },
//    }
//  })
//  //data.map((category) => {
//  //  paths.push({
//  //    params: {
//  //      categoryId: category.key,
//  //    },
//  //  })
//  //  category.subCategories.map((subCategory) => {
//  //    paths.push({
//  //      params: {
//  //        categoryId: subCategory.key,
//  //      },
//  //    })
//  //    subCategory?.subSubCategories.map((subSubCategory) => {
//  //      paths.push({
//  //        params: {
//  //          categoryId: subSubCategory.key,
//  //        },
//  //      })
//  //    })
//  //  })
//  //})
//  //
//  //remove duplicates from paths
//  //const uniquePaths = paths.filter(
//  //  (path, index, self) =>
//  //    index ===
//  //    self.findIndex((t) => t.params.categoryId === path.params.categoryId)
//  //)
//
//  return {
//    paths,
//    fallback: false,
//  }
//}

//getting URL params
export async function getServerSideProps(context) {
  const { params, req } = context
  let products = []
  let categories = []

  try {
    const response = await fetch(
      `http://${req.headers.host}/api/products/productsByCategory`,
      {
        method: 'POST',
        body: JSON.stringify({
          category: params.subSubCategoryId,
          page: 1,
        }),
      }
    )
    await response.json().then(async (data) => {
      products = data
    })
  } catch (error) {
    console.error(error)
  }

  //fetch the products API for categories
  const response2 = await fetch(
    `http://${req.headers.host}/api/categories/categoryById`,
    {
      method: 'POST',
      body: JSON.stringify({
        categoryId: params.categoryId,
      }),
    }
  )
  /*await fetch(
    `https://zino-products-api.herokuapp.com/categories?key=${params.categoryId}`
  )*/
  categories = await response2.json()
  //search the sub category in the category subCategories array

  const subCategory = categories.subCategories.filter(
    (subCategory) => subCategory.key === params.subCategoryId
  )
  return {
    props: {
      products: products,
      categories: subCategory[0].subSubCategories,
    },
  }
}
