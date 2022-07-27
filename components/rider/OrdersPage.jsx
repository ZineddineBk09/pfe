import React, { useEffect, useState } from 'react'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import CurrencyFormat from 'react-currency-format'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

// --- THE ORDERS AVAILABLE FOR THE RIDER ---

const OrdersPage = ({ rider, orders }) => {
  const [myOrders, setMyOrders] = useState()

  //show order products
  useEffect(() => {
    const ordersClone = orders.map((order) => {
      return { ...order, showMore: false }
    })

    setMyOrders(ordersClone)
  }, [orders])

  const handleClick = (index) => {
    let updatedOrder = {
      ...myOrders[index],
      showMore: !myOrders[index].showMore,
    }
    setMyOrders([
      ...myOrders.slice(0, index),
      updatedOrder,
      ...myOrders.slice(index + 1),
    ])
  }

  const updateOrder = (order) => {
    confirmAlert({
      title: 'Accepter la commande',
      message: 'Êtes-vous sûr de faire accepter cette commande?',
      buttons: [
        {
          label: 'Oui',
          onClick: async () => {
            //Updating The Order State
            await fetch('/api/orders', {
              method: 'PATCH',
              body: JSON.stringify({
                id: order.id,
                clientId: order.clientId,
                riderId: rider.id,
                riderName: rider.username,
                orderState: 2,
                products: order.products,
              }),
            })

            //Update The Rider Orders Array
            await fetch('/api/riders', {
              method: 'PATCH',
              body: JSON.stringify({
                riderId: rider.id,
                ...order,
                message: 'UPDATE ORDERS',
                date: new Date(),
              }),
            }).then((msg) => {
              //refresh page to let changes take effect
              window.location.reload(false)
            })
          },
        },
        {
          label: 'Non',
        },
      ],
    })
  }

  return (
    <div>
      {myOrders?.length == 0 ? (
        <div className='bg-white flex flex-col items-center text-amber-500'>
          <h1 className='uppercase text-3xl font-bold'>pas de commandes</h1>
          <img
            src='https://cdn.dribbble.com/users/357929/screenshots/2276751/media/678caef6068a976e4a0d94bbdba6b660.png?compress=1&resize=400x300&vertical=top'
            className='h-64 w-full mx-auto object-contain'
          />
        </div>
      ) : (
        myOrders?.map((order, index) => (
          <div
            key={order?.id}
            className='w-full max-w-screen p-4 text-gray-800 bg-white rounded-lg shadow dark:bg-gray-100 dark:text-gray-800'
            role='alert'
          >
            <div className='flex'>
              <PersonPinCircleIcon className='w-8 h-8 rounded-full shadow-lg' />

              <div className='ml-3 text-sm font-normal'>
                {/* -----------Nom et Prénom----------- */}
                <span className='text-sm font-semibold text-gray-900 dark:text-gray-800'>
                  <p className='capitalize mb-2'>
                    {order?.name || order?.email?.split('@')[0]}
                  </p>
                </span>
                {/* -----------Adresse----------- */}
                <p className='mb-1 text-sm font-normal'>
                  Adresse : {order?.address}
                </p>

                {/* -----------Cité----------- */}
                <p className='mb-1 text-sm font-normal'>
                  Cité : {order?.city.name}
                </p>

                {/* -----------Num telephone----------- */}
                <p className='mb-1 text-sm font-normal'>
                  Numéro de téléphone : {'0' + order?.phoneNumber}
                </p>

                {/* -----------Montant----------- */}
                <div className='mb-1 text-sm font-normal'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <div className=' flex flex-col'>
                        <p className='mb-1 text-sm font-normal text-red-600'>
                          Montant : {value} DA
                        </p>
                      </div>
                    )}
                    decimalScale={2}
                    value={order?.totalAmount - 20 || 0}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>

                {/* -----------Votre paiment----------- */}
                <p className='mb-1 text-sm font-normal text-green-600'>
                  Coûts de livraison : {order?.coast || 20} DA
                </p>

                {/* -----------Produits----------- */}

                <button
                  className='flex items-center  py-1.5 text-sm font-normal text-center text-gray-900 transition duration-200 ease-in-out '
                  onClick={() => handleClick(index)}
                >
                  Produits
                  <p className='ml-4 hover:bg-gray-300 rounded-full'>
                    {order?.showMore ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
                  </p>
                </button>

                {order?.showMore && (
                  <div className='flex flex-col items-center mx-auto max-h-96 h-fit py-5'>
                    <div className='flex flex-col overflow-y-scroll p-2'>
                      {order?.products.map(
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
                                        parseInt(quantity) * parseInt(price) ||
                                        0
                                      }
                                      displayType={'text'}
                                      thousandSeparator={true}
                                    />
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
                <button
                  className='mt-4 px-4 py-1.5 text-sm bg-green-400 p-2 rounded-lg font-normal text-center text-gray-900 uppercase hover:bg-green-500 '
                  onClick={() => order?.state == 1 && updateOrder(order)}
                >
                  accepter la commande
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersPage
