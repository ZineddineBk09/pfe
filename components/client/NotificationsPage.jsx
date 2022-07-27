import React, { useEffect, useState } from 'react'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import CurrencyFormat from 'react-currency-format'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const NotificationsPage = ({ notifications }) => {
  const [myNotifications, setMyNotifications] = useState(notifications)
  const router = useRouter()

  //show notifications products
  useEffect(() => {
    const notificationsClone = notifications.map((notification) => {
      return { ...notification, showMore: false }
    })
    setMyNotifications(notificationsClone.slice(0).reverse())
  }, [notifications])

  //handle clicking on showing products
  const handleClick = (index) => {
    let updatedNotification = {
      ...myNotifications[index],
      showMore: !myNotifications[index].showMore,
    }
    setMyNotifications([
      ...myNotifications.slice(0, index),
      updatedNotification,
      ...myNotifications.slice(index + 1),
    ])
    
  }

  const timeDiff = (date) => {
    const MS_PER_DAY = 1000 * 3600 * 24
    const date_now = new Date().getTime()
    const date_order = new Date(date).getTime()
    // get total seconds between the times
    let delta = Math.abs(date_now - date_order) / 1000

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400)
    delta -= days * 86400

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60
    delta -= minutes * 60

    // what's left is seconds
    const seconds = Math.floor(delta % 60)
    if (days) return 'il ya ' + days + ' jours'
    if (hours) return 'il ya ' + hours + ' heures'
    if (minutes) return 'il ya ' + minutes + ' minutes'
    return days + '-' + hours + '-' + minutes 
  }

  return (
    <div className='bg-gray-100 p-1 min-h-screen mt-16'>
      <button
        className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </button>
      <h1 className='font-semibold text-3xl mt-14 mb-2 ml-4'>
        Notifications :
      </h1>
      {/* slice(0).reverse() will display the list in reverse order */}
      {myNotifications.map((notification, idx) => (
        <div
          key={notification.id || idx}
          className='bg-white px-4 py-3 rounded-lg shadow-md max-w-full'
        >
          <div className='flex mt-3 hover:bg-gray-100 rounded-lg px-1 py-1 cursor-pointer'>
            <div className='flex'>
              <DeliveryDiningIcon className='h-24 w-24 rounded-full' />
            </div>
            <div className='ml-3'>
              <span className='font-semibold text-sm capitalize'>
                {notification?.riderName}
              </span>
              <p className='text-sm'>
                {notification?.message}{' '}
                <button
                  onClick={() => handleClick(idx)}
                  className='ml-4 hover:bg-gray-300 rounded-full transition duration-200 ease-in-out'
                >
                  {notification?.showMore ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )}
                </button>
              </p>

              {notification.showMore && (
                <div className='flex flex-col items-center mx-auto max-h-96 h-fit py-5'>
                  <div className='flex flex-col overflow-y-scroll p-2'>
                    {notification?.products?.map(
                      ({ id, name, price, img, quantity }) => {
                        return (
                          <div
                            className='flex flex-col items-start my-2'
                            key={id}
                          >
                            {/* Image and Title + Name */}
                            <div className='flex items-center'>
                              <img
                                src={img}
                                alt=''
                                className='h-8 object-contain mr-1'
                              />
                              <div>
                                <p className='title-font mb-1 text-xs text-gray-900 w-60'>
                                  {name}
                                </p>
                                {/* Price */}
                                <p className='text-xs text-amber-500'>
                                  {price}
                                </p>
                                {/* Delete Product and Quantity */}
                                <div className='flex items-center justify-between'>
                                  <p className='font-semibold text-xs'>
                                    Qté : {quantity}
                                  </p>
                                  <CurrencyFormat
                                    renderText={(value) => (
                                      <div className=' flex flex-col'>
                                        <p className='mb-1 text-sm font-normal'>
                                          ( Total :{value} DA )
                                        </p>
                                      </div>
                                    )}
                                    decimalScale={2}
                                    value={
                                      parseInt(quantity) * parseInt(price) || 0
                                    }
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                  <p></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              )}
              <p className='text-xs text-gray-500'>
                {timeDiff(notification.date)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationsPage
