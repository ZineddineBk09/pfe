import React, { useEffect, useState } from 'react'
import Subtotal from '../../components/Subtotal'
import CheckoutProduct from '../../components/CheckoutProduct'
import { getCookie } from '../../lib/useCookie'
import Header from '../../components/Header'
import { useStateValue } from '../../React-Context-Api/context'

const Checkout = () => {
  const [myBasket, setMyBasket] = useState([])
  const [{ basket }, dispatch] = useStateValue()
  //Update our myBasket when ever the client make changes to the myBasket
  useEffect(() => {
    setMyBasket(getCookie('basket'))
    //--------------------------------------------------------------
  }, [basket])

  return (
    <div className='flex flex-col'>
      <Header hideSearch={true} />
      <div className='flex items-center justify-between mt-14 lg:mt-16 p-5 text-slate-900 sm:flex-row'>
        {/* Shoping cart */}
        <div className='m-3 flex h-32 w-3/5 flex-col justify-between'>
          <h1 className='text-xl font-semibold md:text-3xl'>Panier</h1>
          <div className='border-b border-gray-300'></div>
        </div>
        <Subtotal />
      </div>
      {myBasket?.map((product) => (
        <CheckoutProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Checkout
