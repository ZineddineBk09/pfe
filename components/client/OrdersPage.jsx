import React, { useEffect, useState } from 'react'
import InventoryIcon from '@mui/icons-material/Inventory'
import CurrencyFormat from 'react-currency-format'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Link from 'next/link'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const OrdersPage = ({ orders }) => {
  const [myOrders, setMyOrders] = useState(orders)
  const router = useRouter()

  //show the products list of the order
  useEffect(() => {
    const ordersClone = orders.map((order) => {
      return { ...order, showMore: false }
    })
    setMyOrders(ordersClone)
  }, [orders])


  const handleClick = (index) => {
    //hide other products list and display the current one
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

  const cancelOrder = (orderId) => {
    confirmAlert({
      title: 'Annuler la commande',
      message: 'Êtes-vous sûr de faire annuler votre commande?',
      buttons: [
        {
          label: 'Oui',
          onClick: async () => {
            await fetch('/api/orders', {
              method: 'DELETE',
              body: JSON.stringify({
                id: orderId,
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
    <div className='p-1 bg-gray-100 mt-16'>
      <button
        className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </button>
      <h1 className='font-semibold text-3xl mt-14 mb-2 ml-4'>Commandes :</h1>
      {myOrders?.length == 0 ? (
        <div className='bg-white flex flex-col items-center text-amber-500'>
          <h1 className='uppercase text-3xl font-bold'>pas de commandes</h1>
          <img
            src='https://cdn.dribbble.com/users/357929/screenshots/2276751/media/678caef6068a976e4a0d94bbdba6b660.png?compress=1&resize=400x300&vertical=top'
            className='h-64 w-full mx-auto object-contain'
          />
          <Link href='/client/pages/page_1' passHref>
            <a className=' text-base hover:underline'>
              Faire une commande <AddShoppingCartIcon />
            </a>
          </Link>
        </div>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={order?.id}
            className='w-full my-2 max-w-screen p-4 text-gray-800 bg-white rounded-lg shadow dark:bg-gray-100 dark:text-gray-800'
          >
            <div className='flex'>
              <InventoryIcon className='w-8 h-8 rounded-full shadow-lg' />

              <div className='ml-3 text-sm font-normal'>
                {/* -----------Nom et Prénom----------- */}
                <span className='text-sm font-semibold text-gray-900 dark:text-gray-800'>
                  <p className='capitalize mb-2'>{order?.date.split('T')[0]}</p>
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

                {/* -----------Etat----------- */}
                <p className='mb-1 text-sm font-normal'>
                  État :{' '}
                  {order?.state == 1
                    ? 'Prêt à livrer '
                    : order?.state == 2
                    ? 'En cours de livraison'
                    : 'Livré'}
                </p>

                {/* -----------Montant----------- */}
                <div className='mb-1 text-sm font-normal'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <div className=' flex flex-col'>
                        <p className='mb-1 text-sm font-normal '>
                          Montant (avec frais de livraison) :
                          <span className='text-red-600 font-semibold'>
                            {' ' + value} DA
                          </span>
                        </p>
                      </div>
                    )}
                    decimalScale={2}
                    value={order?.totalAmount || 0}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>

                {/* -----------Votre paiment----------- */}
                <p className='mb-1 text-sm font-normal '>
                  Coûts de livraison :
                  <span className='text-green-600 font-semibold'>
                    {' ' + order?.coast || 20} DA
                  </span>
                </p>

                {/* -----------Produits----------- */}

                <button
                  className='flex items-center  py-1.5 text-sm font-normal text-center text-gray-900  '
                  onClick={() => handleClick(index)}
                >
                  Produits
                  <p className='ml-4 hover:bg-gray-300 rounded-full transition duration-200 ease-in-out  '>
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

                <button
                  className={`mt-4 py-1.5 text-base p-2 rounded-lg font-normal text-center text-gray-900 uppercase px-4 ${
                    order?.state == 1
                      ? 'bg-red-400 hover:bg-red-500'
                      : order?.state == 2
                      ? 'text-amber-400 hover:bg-amber-500'
                      : 'text-green-400 hover:bg-green-500'
                  }`}
                  onClick={() => order?.state == 1 && cancelOrder(order?.id)}
                >
                  {/* display the message based on the order state */}
                  <p>
                    {order?.state == 1 ? (
                      <div className='w-full flex justify-between '>
                        annuler la commande <CloseIcon className='ml-2' />
                      </div>
                    ) : order?.state == 2 ? (
                      'En cours de livraison ...'
                    ) : (
                      <div className='flex items-center'>
                        Livré
                        <CheckIcon className='ml-2' />
                      </div>
                    )}
                  </p>
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
