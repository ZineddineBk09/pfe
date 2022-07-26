import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Link from 'next/link'

function ImagesSlider() {
  const [sliderProducts, setSliderProducts] = useState([])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  useEffect(() => {
    const fetchAds = async () => {
      //fetching the api for the allAds route
      const response = await fetch(`/api/ads/allActiveAds`)
      const data = await response.json().then((data) => {
        console.log('data : ', data)
        return data
      })

      setSliderProducts(data)
    }
    fetchAds()
  }, [])

  return (
    <div className='overflow-hidden flex h-[80vh] w-full items-center justify-center rounded bg-gradient-to-b from-white to-gray-200 mt-20'>
      {/*Images Slider*/}

      <Slider {...settings} className=' w-5/6 overflow-hidden'>
        {sliderProducts?.map((product, index) => (
          <Link key={index} href={product?.adLink} passHref>
            <a className='flex hover:cursor-pointer '>
              <img
                src={product?.img}
                className='h-[80vh] mb-8 rounded object-contain w-full '
              />
            </a>
          </Link>
        ))}
      </Slider>
      <div className='h-14 bg-gradient-to-b from-cyan-500 to-blue-500'></div>
    </div>
  )
}

export default ImagesSlider
