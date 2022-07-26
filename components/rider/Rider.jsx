import React, { useEffect, useState } from 'react'
import Header2 from '../Header2'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InventoryIcon from '@mui/icons-material/Inventory'
import OrdersPage from './OrdersPage'
import ProfilePage from './ProfilePage'
import DeliveriesPage from './DeliveriesPage'
import { getCookie } from '../../lib/useCookie'

const Rider = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showDeliveries, setShowDeliveries] = useState(false)
  const [showProfile, setShowProfile] = useState(true)
  const [rider, setRider] = useState(getCookie('riderSession'))
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchRiderAndOrders = async () => {
      //fetch the rider info
      try {
        const response1 = await fetch(`/api/riders/singleRider`, {
          method: 'POST',
          body: JSON.stringify({
            riderId: rider?.id,
          }),
        })
        await response1.json().then(async (data) => {
          setRider(data)
          //fetch the orders based on the rider region
          const response2 = await fetch(`/api/orders/ordersByRegion`, {
            method: 'POST',
            body: JSON.stringify({
              region: data?.region?.name,
            }),
          })
          await response2.json().then((data) => {
            setOrders(data)
          })
        })
      } catch (err) {
        //alert(err)
        console.error(err)
      }
    }
    fetchRiderAndOrders()
  }, [])

  return (
    <div className='w-screen overflow-x-hidden'>
      <Header2 hideSearch={true} hideBasket={true} hideOptions={true} />

      <nav className='bg-white '>
        <div className='flex justify-around items-center h-20 rounded bg-gray-200 mb-4 transition duration-500 ease-in-out mt-14 lg:mt-16'>
          {/* -------------Notifications----------- */}
          <button
            className={`w-full mx-auto flex items-center justify-center border-b-2 border-transparent h-full text-gray-800 hover:text-gray-400 hover:bg-gray-300 transition duration-200 ease-in-out  ${
              showNotifications && 'border-slate-800'
            }`}
            title='commandes disponibles'
            onClick={() => {
              setShowProfile(false)
              setShowDeliveries(false)
              setShowNotifications(true)
            }}
          >
            <NotificationsIcon className='text-gray-500 !text-[35px] hover:cursor-pointer hover:bg-slate-300 rounded-full p-1' />
            {orders?.length > 0 && (
              <span className=' text-center'>
                <div className=' bg-red-500 border-2 border-white rounded-full p-0.5 mb-6 -ml-2 text-xs font-semibold text-white '>
                  {orders?.length}
                </div>
              </span>
            )}
          </button>

          <div className='my-auto h-full border border-gray-300'></div>

          {/* -------------Orders----------- */}
          <button
            className={`w-full  mx-auto h-full border-b-2  border-transparent hover:bg-gray-300 transition duration-200 ease-in-out ${
              showDeliveries && 'border-slate-800'
            }`}
            onClick={() => {
              setShowNotifications(false)
              setShowProfile(false)
              setShowDeliveries(true)
            }}
            title='commandes livrées'
          >
            <InventoryIcon className='text-gray-500 !text-[35px] p-1  hover:cursor-pointer hover:bg-slate-300 rounded-full  hover:scale-105' />
          </button>

          <div className='my-auto h-full border border-gray-300'></div>

          {/* ------------Profile----------- */}
          <button
            className={`w-full  mx-auto h-full border-b-2  border-transparent hover:bg-gray-300 transition duration-200 ease-in-out ${
              showProfile && 'border-slate-800'
            }`}
            onClick={() => {
              setShowNotifications(false)
              setShowDeliveries(false)
              setShowProfile(true)
            }}
            title='profile'
          >
            <AccountCircleIcon
              className='text-gray-500 !text-[35px] p-1  hover:cursor-pointer hover:bg-slate-300 rounded-full  hover:scale-105'
              titleAccess='profile'
            />
          </button>
        </div>
      </nav>
      {showNotifications && <OrdersPage rider={rider} orders={orders} />}

      {showProfile && <ProfilePage rider={rider} />}

      {showDeliveries && (
        <DeliveriesPage rider={rider} deliveries={rider?.orders} />
      )}
    </div>
  )
}

export default Rider
