import React, { useEffect, useState } from 'react'
const Body = dynamic(() => import('../../../components/HomeBody'))
const Header2 = dynamic(() => import('../../../components/Header2'))
const Footer = dynamic(() => import('../../../components/Footer'))
const CategoriesFilter = dynamic(() =>
  import('../../../components/CategoriesFilter')
)
const Pagination = dynamic(() => import('../../../components/Pagination'))
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Page = ({ products, currentPage, pages }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'http://zino-products-api.herokuapp.com/categories'
      )
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'
      className='relative flex min-h-screen flex-col bg-gray-200'
    >
      <Header2 />
      <CategoriesFilter categories={categories} />
      <Body products={products} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        numberOfPages={pages?.length}
      />
      <Footer />
    </motion.div>
  )
}

export default Page

export async function getServerSideProps(context) {
  const { params, req } = context

  const pageNumber = params.page.split('_')[1]
  let products = []
  let pages = []

  try {
    // Get the prducts of each page
    const response1 = await fetch(
      `http://${req.headers.host}/api/products/pageProducts`,
      {
        method: 'POST',
        body: JSON.stringify({
          pageNumber: pageNumber,
          nPerPage: 30,
        }),
      }
    )
    await response1.json().then((data) => {
      products = data
    })

    //setting the pages urls and there number
    const response2 = await fetch(
      `http://${req.headers.host}/api/products/allProducts`
    )
    await response2.json().then((data) => {
      // Get the number of pages by dividing the number of products by the number of products per page
      const totalPages = Math.floor(data?.length / 30) + 1

      for (let index = 0; index < totalPages; index++) {
        pages.push({
          page: '/client/pages/page_' + (index + 1),
          value: index + 1,
        })
      }
    })
  } catch (err) {
    console.error(err)
  }

  //send first 30 products
  return {
    props: { products, currentPage: pageNumber, pages },
  }
}

//export async function getStaticPaths(req) {
//
//  const paths = []
//  try {
//    //setting the pages urls and there number
//    const response = await fetch(
//      `/api/products/allProducts`
//    )
//    await response.json().then((data) => {
//      // Get the number of pages by dividing the number of products by the number of products per page
//      const totalPages = Math.floor(data?.length / 30) + 1
//
//      for (let index = 0; index < totalPages; index++) {
//        paths.push({ params: { page: 'page_' + (index + 1) } })
//      }
//    })
//  } catch (err) {
//    console.error(err)
//  }
//  console.log('paths : ', paths)
//  return {
//    paths,
//    fallback: false,
//  }
//}
//
