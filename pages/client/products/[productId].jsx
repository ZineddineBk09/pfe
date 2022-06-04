import React from 'react'
const ProductInfo = dynamic(() => import('../../../components/ProductInfo'))
const Header = dynamic(() => import('../../../components/Header'))
const Footer = dynamic(() => import('../../../components/Footer'))
import { App, Credentials } from 'realm-web'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const ProductId = ({ product }) => {
  const router = useRouter()

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='relative flex min-h-screen flex-col bg-gray-100 '>
        <Header />
        <button
          className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        <ProductInfo key={product.id} product={product} />
        <Footer />
      </div>
    </motion.div>
  )
}

export default ProductId

export async function getServerSideProps(context) {
  const { params,req } = context
  const { productId } = params
  let product = []

  try {
    const response = await fetch(
      `http://${req.headers.host}/api/products/singleProduct`,
      {
        method: 'POST',
        body: JSON.stringify({
          productId: productId,
        }),
      }
    )
    await response.json().then((data) => {
      console.log('PRODUCT : ', data);
      product = data
    })
  } catch (err) {
    alert(err)
  }
  
  return {
    props: {
      product,
    },
  }
}
