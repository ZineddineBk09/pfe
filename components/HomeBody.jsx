import React, { useEffect, useState } from 'react'
import Product from './Product'
import ImagesSlider from './ImagesSlider'
import { useStateValue } from '../React-Context-Api/context'
import { motion } from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component'
import Search from './Search'

function Body({ products }) {
  const [{ filteredProducts }, dispatch] = useStateValue()
  //implement infinite scroll
  const [myProducts, setMyProducts] = useState(products)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  //track changes on page url to unfilter the searched products

  //track changes on products
  useEffect(() => {
    setMyProducts(products)
  }, [products])

  const getMoreProducts = async () => {
    //fetch the next page products
    try {
      const response = await fetch(`/api/products/productsByCategory`, {
        method: 'POST',
        body: JSON.stringify({
          category: products[0].category,
          page: page + 1,
        }),
      })
      await response.json().then((data) => {
        console.log('data : ', data)
        //append the new products to the current products
        setMyProducts([...myProducts, ...data])

        //increment the page number to get the next 20 products
        setPage(page + 1)

        //check if we have more products to load (< 20 => we don't have more products)
        data.length < 20 && setHasMore(false)
      })
    } catch (err) {
      //alert(err)
      console.error(err)
    }
  }

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
    <motion.div
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'
      className='p-5'
    >
      {/*Images Slider*/}
      <ImagesSlider />

      {/* Products */}
      <InfiniteScroll
        dataLength={myProducts?.length}
        next={getMoreProducts}
        hasMore={hasMore}
        loader={
          hasMore && (
            <h3 className='text-amber-500 flex justify-center items-center mt-3'>
              Loading...
            </h3>
          )
        }
        endMessage={
          <div className='mx-auto my-2 w-3/6 border border-amber-500'></div>
        }
      >
        <motion.div
          variants={stagger}
          className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 transition ease-in-out duration-500'
        >
          {/* <Search/> */}
          {myProducts.map((product) => {
            if (product?.units > 0)
              return (
                <motion.div key={product.id} variants={fadeInUP}>
                  <Product key={product.id} product={product} />
                </motion.div>
              )
          })}
        </motion.div>
      </InfiniteScroll>
    </motion.div>
  )
}

export default Body
