import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CategoriesFilter = ({ categories }) => {
  const [myCategories, setMyCategories] = useState(categories)
  useEffect(() => {
    const subSubCategory=window.location.href.split('/')[7]
    const subCategory = window.location.href.split('/')[6]
    setMyCategories(categories)
    setMyCategories(
      categories.map((c) => {
        if (c.key == subSubCategory || c.key == subCategory) {
          c.selected = true
        } else {
          c.selected = false
        }
        return c
      })
    )
  }, [categories])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  return (
    <div className='hidden lg:block mb-12'>
      <div className='transition duration-500 z-10 flex h-10 w-full items-center justify-around bg-transparent text-white font-semibold text-sm shadow-xl border-y-2'>
        {myCategories?.map((cat, index) =>
          cat.key == 'all' ? (
            <div
              key={index}
              className={`${
                cat.selected && 'border-b-[3px] border-amber-500'
              } relative w-[calc(100vw/8)] h-full flex justify-center items-center`}
              onClick={() => {
                setMyCategories(
                  myCategories.map((c) => {
                    if (c.key == 'all') {
                      c.selected = true
                    } else {
                      c.selected = false
                    }
                    return c
                  })
                )
              }}
            >
              <Link href={`/client/pages/page_1`} passHref>
                <a className={`flex  hover:cursor-pointer`}>
                  <p className=' hover:underline capitalize'>
                    {truncate(cat.value, 20)}
                  </p>
                </a>
              </Link>
            </div>
          ) : (
            <div
              key={index}
              className={`${
                cat.selected && 'border-b-[3px] border-amber-500'
              } relative w-[calc(100vw/8)] h-full flex justify-center items-center`}
              onClick={() => {
                if (!cat.selected) {
                  setMyCategories(
                    myCategories.map((c) => {
                      if (c.key == cat.key) {
                        c.selected = true
                      } else {
                        c.selected = false
                      }
                      return c
                    })
                  )
                }
              }}
            >
              <Link href={`/client/categories${cat.url}`} passHref>
                <a className={`flex hover:cursor-pointer `}>
                  <p className='hover:underline capitalize'>
                    {truncate(cat.value, 20)}
                  </p>
                </a>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default CategoriesFilter
