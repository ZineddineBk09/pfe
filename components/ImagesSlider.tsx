import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function ImagesSlider() {
  const sliderProducts = [
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/61/0543/1.jpg?4550',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/5903/1.jpg?3688',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/46/6292/1.jpg?2297',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/5903/1.jpg?3688',
    'https://dz.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/0823/1.jpg?4854',
  ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <div className="flex h-3/6 w-full items-center justify-center rounded bg-white shadow-lg">
      {/*Images Slider*/}

      <ChevronLeftIcon />
      <Slider {...settings} className="w-5/6 overflow-x-visible">
        {sliderProducts.map((product,index) => (
          <div key={index} className="flex">
            <img src={product} className="h-full rounded " />
          </div>
        ))}
      </Slider>
      <ChevronRightIcon />
    </div>
  )
}

export default ImagesSlider
