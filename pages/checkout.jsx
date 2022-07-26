import React, { useEffect, useState } from 'react'
import Subtotal from '../components/Subtotal'
import { useStateValue } from '../React-Context-Api/basketContext'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'

const checkout = () => {
  const [{ basket }, dispatch] = useStateValue()

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-5 text-slate-900 sm:flex-row">
        {/* Shoping cart */}
        <div className="m-3 flex h-32 w-3/5 flex-col justify-between">
          <h1 className="text-xl font-semibold md:text-3xl">Shopping Basket</h1>
          <div className="border-b border-gray-300"></div>
        </div>
        <Subtotal />
      </div>
      {basket.map((product) => (
        <CheckoutProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

export default checkout
