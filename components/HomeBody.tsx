import React, { useState } from 'react'
import Product from './Product'
import ImagesSlider from './ImagesSlider'

function Body({ products }) {
  return (
    <div>
      {/*Images Slider*/}
      <ImagesSlider />

      {/* Products */}
      <div className='mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Body
