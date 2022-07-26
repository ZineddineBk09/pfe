import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Head from 'next/head'
const Hero = dynamic(() => import('../components/landingPage/Hero'))
const Layout = dynamic(() => import('../components/landingPage/Layout/Layout'))

export default function Home() {
  //fetch all categories from database with api call
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('api/categories/allCategories')
      const data = await response.json()
      console.log('DATA : ',data)
    }
    fetchCategories()
  }, [])
  return (
    <div className="relative bg-bg-index max-h-screen w-screen object-cover overflow-x-hidden">
      <Head>
        <title>9odyani</title>
        <link rel='shortcut icon' href='/images/Logo.jpg' />
      </Head>
      <Layout>
        <Hero />
      </Layout>
    </div>
  )
}
