import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import HeroImg from '../../public/images/Hero_img2.png'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from '../../lib/useCookie'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const Hero = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  //getting the rider session from cookies if they exists
  const [riderSession, setRiderSession] = useState({})

  useEffect(() => {
    console.log('-------- / page --------')
    setRiderSession(getCookie('riderSession'))
  }, [status, session])

  return (
    <div
      className='  max-w-screen-xl mt-40 px-8 xl:px-10 mx-auto flex flex-col h-screen'
      id='about'
    >
      <div className=' w-2/5 mx-auto flex flex-col justify-center items-center row-start-2 sm:row-start-1 text-white'>
        <h1 className='font-dm font-black text-3xl lg:text-4xl xl:text-5xl text-black-600 leading-normal '>
          Facile & Rapide
        </h1>
        <p className='font-bold text-black-500 mt-16 mb-16'>
          Garantissons les meilleurs prix.
        </p>
        {/* ---Client and rider buttons */}
        <div className=' mt-16 flex items-center justify-evenly w-full '>
          <Link href='/client' passHref>
            <a>
              <motion.p
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.5 }}
                className='px-6 py-3 rounded text-white font-bold hover:scale-105 border-2  hover:shadow-white hover:shadow-sm'
              >
                Client
                <span className='mx-4'>
                  <AddShoppingCartIcon />
                </span>
              </motion.p>
            </a>
          </Link>

          {/* we check if the rider is authenticated to see if we direct him to the authentication page or directly to his profile */}
          <Link href={riderSession ? '/rider' : '/rider/auth/signin'} passHref>
            <a>
              <motion.p
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.5 }}
                className='px-6 py-3 rounded text-white font-bold hover:scale-105 border-2  hover:shadow-white hover:shadow-sm'
              >
                Livreur
                <span className='mx-4'>
                  <LocalShippingIcon />
                </span>
              </motion.p>
            </a>
          </Link>
        </div>
      </div>
      {/* <div className='flex w-full'>
          <div className='h-full w-full'>
            <Image
              src={HeroImg}
              alt='VPN Illustrasi'
              quality={100}
              width={612}
              height={583}
              layout='responsive'
              className='rounded'
            />
          </div>
        </div> */}
    </div>
  )
}

export default Hero
