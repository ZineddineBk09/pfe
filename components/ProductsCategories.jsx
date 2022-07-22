import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ProductsCategories = ({ categories }) => {
  const [myCategories, setMyCategories] = useState(categories)

  useEffect(() => {
    setMyCategories(categories)
    console.log('CATEGORIES : ', categories)
  }, [categories])

  const easing = [0.6, -0.05, 0.01, 1]
  const fadeInUP = {
    initial: {
      opacity: 0,
      y: 60,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  }
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1, //0.1 is the delay between each child animation
      },
    },
  }

  return (
    <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate'>
      <motion.div
        variants={stagger}
        className={`my-4 grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-4`}
      >
        {myCategories.map((cat) => (
          <motion.div
            variants={fadeInUP}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.5 }}
            className='p-2 h-40 flex flex-col items-center rounded shadow-xl transition duration-300 hover:scale-95 md:flex-col md:justify-evenly text-white font-bold  hover:shadow-white hover:shadow-sm '
            style={{
              backgroundImage: `url(${cat.img})`,
              objectFit: 'contain',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            key={cat.key}
          >
            <p className=' font-bold text-xl  text-center capitalize'>
              {cat.value}
            </p>

            <Link href={`/client/categories${cat.url}`} passHref>
              <a className='flex items-center justify-center text-black font-black text-sm uppercase h-14 w-28 bg-amber-500'>
                Shop now
              </a>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProductsCategories
