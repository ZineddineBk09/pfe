import React, { useEffect, useState } from 'react'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import CurrencyFormat from 'react-currency-format'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

// --- THE ORDERS DELIVERED BY THE RIDER ---

const OrdersPage = ({ rider, deliveries }) => {
  const [myDeliveries, setMyDeliveries] = useState(deliveries)

  //show delivery products
  useEffect(() => {
    const ordersClone = deliveries?.map((order) => {
      return { ...order, showMore: false }
    })
    setMyDeliveries(ordersClone)
  }, [deliveries])

  const handleClick = (index) => {
    let updatedOrder = {
      ...myDeliveries[index],
      showMore: !myDeliveries[index].showMore,
    }
    setMyDeliveries([
      ...myDeliveries.slice(0, index),
      updatedOrder,
      ...myDeliveries.slice(index + 1),
    ])
  }

  //In case the client accepted the order
  const updateOrder = (order) => {

    confirmAlert({
      title: 'Commande livrée',
      message: `Êtes-vous sûr que cette commande est livrée a ${order.name} ?`,
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
                riderId: rider?.id,
                riderName: rider?.name,
                orderState: 3,
              }),
            })

            //Update The Rider Orders Array => change the order state from the array
            await fetch('/api/riders', {
              method: 'PATCH',
              body: JSON.stringify({
                riderId: rider.id,
                orderId: order?.id,
                date: new Date(),
                message: 'UPDATE STATE',
                orderState: 3,
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

  //In case the client canceled the order
  const refuseOrder = (order) => {
    confirmAlert({
      title: 'Commande refusée',
      message: `Êtes-vous sûr que cette commande est refusée par ${order.name} ?`,
      buttons: [
        {
          label: 'Oui',
          onClick: async () => {
            //Delete the order from the database
            await fetch('/api/orders', {
              method: 'DELETE',
              body: JSON.stringify({
                id: order.id,
              }),
            })

            //Update The Rider Orders Array => delete the order from the array
            await fetch('/api/riders', {
              method: 'PATCH',
              body: JSON.stringify({
                riderId: rider.id,
                orderId: order?.id,
                message: 'DELETE ORDER',
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
      {myDeliveries?.length == 0 ? (
        <div className='bg-white flex flex-col items-center text-amber-500'>
          <h1 className='uppercase text-3xl font-bold'>pas de commandes</h1>
          <img
            src='https://cdn.dribbble.com/users/357929/screenshots/2276751/media/678caef6068a976e4a0d94bbdba6b660.png?compress=1&resize=400x300&vertical=top'
            className='h-64 w-full mx-auto object-contain'
          />
        </div>
      ) : (
        myDeliveries.map((delivery, index) => (
          <div
            key={delivery?.id}
            className='w-full max-w-screen p-4 text-gray-800 bg-white rounded-lg shadow dark:bg-gray-100 dark:text-gray-800 '
          >
            <div className='flex'>
              <PersonPinCircleIcon className='w-8 h-8 rounded-full shadow-lg' />

              <div className='ml-3 text-sm font-normal'>
                {/* -----------Nom et Prénom----------- */}
                <span className='text-sm font-semibold text-gray-900 dark:text-gray-800'>
                  <p className='capitalize mb-2'>
                    {delivery?.name || delivery?.email?.split('@')[0]}
                  </p>
                </span>
                {/* -----------Adresse----------- */}
                <p className='mb-1 text-sm font-normal'>
                  Adresse : {delivery?.address}
                </p>

                {/* -----------Cité----------- */}
                <p className='mb-1 text-sm font-normal'>
                  Cité : {delivery?.city.name}
                </p>

                {/* -----------Num telephone----------- */}
                <p className='mb-1 text-sm font-normal'>
                  Numéro de téléphone : {'0' + delivery?.phoneNumber}
                </p>

                {/* -----------Montant----------- */}
                <div className='mb-1 text-sm font-normal'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <div className=' flex flex-col'>
                        <p className='mb-1 text-sm font-normal '>
                          Montant :{' '}
                          <span className='text-red-600'>{value} DA</span>
                        </p>
                      </div>
                    )}
                    decimalScale={2}
                    value={delivery?.totalAmount - 20 || 0}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>

                {/* -----------Votre paiment----------- */}
                <p className='mb-1 text-sm font-normal '>
                  Coûts de livraison :{' '}
                  <span className='text-green-600'>
                    {delivery?.coast || 20} DA
                  </span>
                </p>
                {/* -----------État----------- */}
                <p className={`mb-1 text-sm font-normal `}>
                  État :
                  <span
                    className={`${
                      delivery?.state == 2 ? 'text-amber-500' : 'text-green-600'
                    }`}
                  >
                    {delivery?.state == 2
                      ? ' En cours de livraison...'
                      : ' Livré'}
                  </span>
                </p>
                {/* -----------Produits----------- */}

                <button
                  className='flex items-center  py-1.5 text-sm font-normal text-center text-gray-900 transition duration-200 ease-in-out '
                  onClick={() => handleClick(index)}
                >
                  Produits
                  <p className='ml-4 hover:bg-gray-300 rounded-full'>
                    {delivery?.showMore ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
                  </p>
                </button>

                {delivery?.showMore && (
                  <div className='flex flex-col items-center mx-auto max-h-96 h-fit py-5'>
                    <div className='flex flex-col overflow-y-scroll p-2'>
                      {delivery?.products.map(
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
                                      } // Part of the homework
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
                {delivery?.state != 3 && (
                  <div>
                    <button
                      className='mr-4 mt-4 py-1.5 px-4 text-sm bg-green-400 rounded-lg font-normal text-center text-gray-900 uppercase hover:bg-green-500 '
                      onClick={() => updateOrder(delivery)}
                    >
                      Livré
                      <span className='ml-2'>
                        <CheckIcon />
                      </span>
                    </button>
                    <button
                      className='ml-4 mt-4 py-1.5 px-4 text-sm bg-red-400 rounded-lg font-normal text-center text-gray-900 uppercase hover:bg-red-500 '
                      onClick={() => refuseOrder(delivery)}
                    >
                      Refusé
                      <span className='ml-2'>
                        <CloseIcon />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersPage
