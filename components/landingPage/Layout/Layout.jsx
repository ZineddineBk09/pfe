import React from 'react'
import Header from '../../Header'
import Footer from '../../Footer'

const Layout = ({ children }) => {
  return (
    <div className='bg-bg-index h-full w-screen object-cover overflow-auto'>
      <div className='relative h-full bg-black bg-opacity-30'>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
