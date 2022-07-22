import React, { useEffect, useState } from 'react'
const Header = dynamic(() => import('../../components/Header'))
const Subtotal = dynamic(() => import('../../components/Subtotal'))
const CheckoutProduct = dynamic(() => import('../../components/CheckoutProduct'))
import { getCookie } from '../../lib/useCookie'
import { useStateValue } from '../../React-Context-Api/context'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'
import dynamic from 'next/dynamic'
import Footer from '../../components/Footer'

const Checkout = () => {
  const [myBasket, setMyBasket] = useState([])
  const [{ basket }, dispatch] = useStateValue()
  const router = useRouter()
  //Update our myBasket when ever the client make changes to the myBasket
  useEffect(() => {
    setMyBasket(getCookie('basket'))
    //--------------------------------------------------------------
  }, [basket])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex flex-col bg-black text-white'
    >
      <Header hideSearch={true} />
      <button
        className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </button>
      <div className='flex items-center justify-between mt-14 lg:mt-16 p-5  sm:flex-row'>
        {/* Shoping cart */}
        <div className='m-3 flex h-32 w-3/5 flex-col justify-between'>
          <h1 className='text-xl font-semibold md:text-3xl ml-8'>Panier</h1>
          <div className='border-b-2 border-white'></div>
        </div>
        <Subtotal />
      </div>
      {myBasket?.map((product) => (
        <CheckoutProduct key={product.id} product={product} />
      ))}
      <Footer />
    </motion.div>
  )
}

export default Checkout
