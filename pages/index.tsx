import React, { useState, useEffect } from 'react'
import Body from '../components/HomeBody'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { StateContext } from '../React-Context-Api/basketContext'

export default function Home({ products }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <Body products={products} />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    'https://zinou-products-api.herokuapp.com/products?_limit=10'
  )
  const data = await response.json()
  console.log(data)
  return {
    props: { products: data },
  }
}
