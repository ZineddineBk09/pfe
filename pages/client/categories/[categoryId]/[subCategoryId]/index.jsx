import React, { useEffect, useState } from 'react'
const Body = dynamic(() => import('../../../../../components/HomeBody'))
const CategoriesFilter = dynamic(() =>
  import('../../../../../components/CategoriesFilter')
)
const Header = dynamic(() => import('../../../../../components/Header'))
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
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate' className='bg-black'>
      <Header />
      <CategoriesFilter categories={categories} />
      {products.length == 0 && <ImagesSlider />}
      {categories.length > 1 && <ProductsCategories categories={categories} />}
      {products?.length > 0 && <Body products={products} />}

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
//export async function getServerSideProps(context) {
//  const { params } = context
//
//  let category = {}
//  let subCategory = {}
//  let products = []
//
//  const REALM_APP_ID = process.env.REALM_APP_ID || 'pfe-etnhz'
//  const app = new  App({ id: REALM_APP_ID })
//  const credentials =  Credentials.anonymous()
//  try {
//    const user = await app.logIn(credentials)
//    category = await user.functions.getCategoryById(params.categoryId)
//
//    //search the sub category in the category subCategories array
//    subCategory = category.subCategories.filter(
//      (subCategory) => subCategory.key === params.subCategoryId
//    )
//
//    //check if we have only one sub sub category to display the products
//    if (subCategory.subSubCategories.length === 1) {
//      products = await user.functions.getProductsByCategory({
//        category: params.subCategoryId,
//        page: 1,
//      })
//      return {
//        props: {
//          categories: subCategory[0].subSubCategories,
//          products: products,
//        },
//      }
//    }
//  } catch (error) {
//    console.error(error)
//  }
//
//  //fetch the products API for categories
//  //const response = await fetch(
//  //  `https://zino-products-api.herokuapp.com/categories?key=${params.categoryId}`
//  //)
//  //categories = await response.json()
//  ////search the sub category in the category subCategories array
//  //
//  //const subCategory = categories[0].subCategories.filter(
//  //  (subCategory) => subCategory.key === params.subCategoryId
//  //)
//  //
//  ////check if we have only one sub sub category to display the products
//  //if (subCategory[0].subSubCategories.length === 1) {
//  //  let products = []
//  //  //fetch the products API for the sub category products
//  //  const response = await fetch(
//  //    `https://zino-products-api.herokuapp.com/products?category=${params.subCategoryId}`
//  //  )
//  //  products = await response.json()
//  //
//  //  return {
//  //    props: {
//  //      categories: subCategory[0].subSubCategories,
//  //      products: products,
//  //    },
//  //  }
//  //}
//
//  //if we have more than one sub sub category, we display the sub sub categories
//  return {
//    props: {
//      categories: subCategory.subSubCategories,
//      products: [],
//    },
//  }
//}
//
