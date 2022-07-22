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
  console.log('ADS : ', sliderProducts)

  return (
    <div className='overflow-hidden mt-8 flex h-4/5 w-full mx-auto items-center justify-center rounded  '>
      {/*Images Slider*/}

      <Slider {...settings} className=' w-5/6 overflow-hidden'>
        {sliderProducts?.map((product, index) => (
          <Link key={index} href={product?.adLink} passHref>
            <a className='flex hover:cursor-pointer '>
              <img
                src={
                  'https://themes.woocommerce.com/bistro/wp-content/uploads/sites/99/2022/05/pexels-vanessa-loring-5966140.jpg' ||
                  product?.img
                }
                className='h-4/5 mb-8 mt-6 rounded object-cover'
              />
            </a>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default ImagesSlider
