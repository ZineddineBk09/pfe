import React, { useEffect, useState } from 'react'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import CurrencyFormat from 'react-currency-format'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const OrdersPage = ({ deliveries }) => {
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

  return (
    <div>
      {myDeliveries &&
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
                    {delivery?.name || delivery?.email.split('@')[0]}
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
                        <p className='mb-1 text-sm font-normal text-red-600'>
                          Montant : {value} DA
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
                <p className='mb-1 text-sm font-normal text-green-600'>
                  Coûts de livraison : {delivery?.coast || 20} DA
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
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default OrdersPage
