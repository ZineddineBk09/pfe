import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../React-Context-Api/context'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../React-Context-Api/reducer'
import { getCookie } from '../../lib/useCookie'
import { useRouter } from 'next/router'
import { clearBasket } from '../../React-Context-Api/Actions/basketActions'

export default function PayementForm() {
  const [{ basket, client }, dispatch] = [...useStateValue()] || []
  const router = useRouter()
  const [user, setUser] = useState({})

  //we use an object that contains all variables as a global state instead of declaring each variable individualy which a better approach
  const initialValues = {
    clientId: '',
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    region: '',
    city: { name: '', price: 0 },
  }
  const [values, setValues] = useState(initialValues)

  const [myOrder, setMyOrder] = useState([])

  //Get the updated Basket and Client
  useEffect(() => {
    function updateBasketAndClient() {
      setMyOrder(getCookie('basket'))
      setUser(getCookie('clientSession'))
    }
    updateBasketAndClient()
  }, [basket, client])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(),
        clientId: user?.id,
        name: user?.name,
        email: user?.email,
        ...values,
        region: values.region.name,
        products: myOrder,
        coast: values.city.price,
        totalAmount: parseInt(getBasketTotal(myOrder) || 0) + values.city.price,
      }),
    })
    //clear the basket after validating the Order
    dispatch(clearBasket())

    console.log('Order Validated')
    //return to page 01
    router.push('/client')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'city') {
      setValues({
        ...values,
        city: { name: JSON.parse(value).name, price: JSON.parse(value).price },
      })
    } else if (name === 'region') {
      setValues({
        ...values,
        region: {
          name: JSON.parse(value).name,
          isoCode: JSON.parse(value).id,
          cities: JSON.parse(value).cities,
        },
        clientId: user?.id,
        name: user?.name,
        email: user?.email,
      })
    } else {
      setValues({
        ...values,
        [name]: value,
      })
    }
  }

  const [regions, setRegions] = useState([])

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        //fetch the regions(willayas)
        const response = await fetch(`/api/regions/allRegions`)
        await response.json().then((data) => {
          setRegions(data)
        })
      } catch (err) {
        alert(err)
      }
    }
    fetchRegions()
  }, [])

  return (
    <div className='flex bg-gray-100 m-auto min-w-3/5 mb-4'>
      <div className='shadow-default m-auto w-full max-w-xl rounded-lg border bg-white px-1'>
        <div className='text-primary m-6 '>
          <div className='mt-3 flex items-center justify-center'>
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Valider votre commande
            </h1>
          </div>
          <form
            action=''
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            {/* ----Nom----- */}
            <label className='text-left'>
              Quel est votre nom? <i className='text-red-500'>*</i>
            </label>

            <input
              type='text'
              id='name'
              name='name'
              placeholder='nom'
              value={user.name}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              readOnly
              required
              disabled={true}
            />

            {/* ----Telephone----- */}
            <label>
              Quel est votre numéro de téléphone?{' '}
              <i className='text-red-500'>*</i>
            </label>
            <div className='flex'>
              <p
                className={
                  'text-primary mb-4 rounded-md border p-2 text-sm outline-none'
                }
              >
                +213
              </p>
              <input
                name='phoneNumber'
                type='tel'
                value={values.phoneNumber}
                onChange={(e) => handleInputChange(e)}
                placeholder='000 000 000'
                className={
                  'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
                }
              />
            </div>

            {/* -----Email------ */}
            <label className='text-left'>
              Quel est votre adresse mail? <i className='text-red-500'>*</i>
            </label>
            <input
              //onChange={e=>handleInputChange(e)}
              type='email'
              id='email'
              placeholder='e-mail'
              name='email'
              value={user.email}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              readOnly
              disabled={true}
              required
            />

            {/* ----Adresse----- */}
            <label className='text-left'>
              Quel est votre adresse? <i className='text-red-500'>*</i>
            </label>
            <textarea
              onChange={(e) => handleInputChange(e)}
              value={values.address}
              type='text'
              id='address'
              placeholder='address'
              name='address'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />

            {/* ----Region----- */}
            <label className='text-left'>
              région <i className='text-red-500'>*</i>
            </label>
            <select
              name='region'
              value={values.region}
              onChange={(e) => handleInputChange(e)}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            >
              <option value={null}>
                {values.region?.name
                  ? values.region.isoCode + ' - ' + values.region?.name
                  : 'Sélectionner'}
              </option>
              {regions.map((state) => (
                <option
                  value={JSON.stringify(state)}
                  key={state.id || Math.random() * 1000}
                >
                  {state.id + ' - ' + state.name}
                </option>
              ))}
            </select>

            {/* ----Cité----- */}
            <label className='text-left'>
              cité <i className='text-red-500'>*</i>
            </label>
            <select
              name='city'
              value={values.city.name}
              onChange={(e) => handleInputChange(e)}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            >
              <option value={null}>
                {values.city?.name ? values.city?.name : 'Sélectionner'}
              </option>
              {values?.region.cities?.map((city) => (
                <option
                  value={JSON.stringify(city)}
                  key={city.id || Math.random() * 1000}
                >
                  {city.name}
                </option>
              ))}
            </select>

            {/* --------------PAYEMENT-------------- */}
            <div className='mx-auto my-2 w-full border border-amber-500'></div>

            <div className='mx-auto mb-4 mt-2 flex w-full flex-col items-center'>
              <h1 className='mt-2 mb-4 border-b border-gray-500 text-xl font-bold uppercase'>
                paiment
              </h1>

              <div className='mb-6 flex flex-col items-center justify-between'>
                <div className='flex items-center justify-center'>
                  <input
                    type='radio'
                    name='payement'
                    id='payement'
                    checked
                    readOnly
                  />
                  <img
                    src='https://static.jumia.dz/cms/Icons/payment_logo/i-service-cash.png'
                    alt=''
                    className='mx-4'
                  />
                  <p>Paiement à la livraison</p>
                </div>
                <p className='my-6 w-10/12 text-sm text-gray-600'>
                  Payez votre commande à la livraison: <br />
                  <strong>.</strong> En espèces, assurez-vous d&apos;avoir le
                  montant exact de paiement. Nos livreurs ne sont pas munis de
                  monnaie. <br />
                  <strong>.</strong> Le paiement se fera directement auprès du
                  prestataire de livraison.
                </p>
                <div className='w-8/12'>
                  <CurrencyFormat
                    renderText={(value) => (
                      <div className=' flex flex-col'>
                        <div className='flex justify-between'>
                          <p> Total des Articles</p>
                          <p className='font-bold'> {value} DA</p>
                        </div>
                        <p className='flex justify-between'>
                          Montant de la livraison
                          <strong>{values.city.price} DA</strong>
                        </p>
                        <div className='mx-auto my-2 w-full border border-gray-500'></div>
                        <div className='flex justify-between'>
                          Totale
                          <i className='font-bold text-green-600'>
                            <CurrencyFormat
                              renderText={(value) => (
                                <div className=' flex flex-col'>
                                  <p className='mb-1 text-sm font-normal'>
                                    {value} DA
                                  </p>
                                </div>
                              )}
                              decimalScale={2}
                              value={parseInt(
                                getBasketTotal(myOrder) + values?.city.price
                              )}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </i>
                        </div>
                      </div>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(myOrder) || 0}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
                <div className='mt-3 flex items-center justify-center'>
                  <button
                    className={
                      'text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                    }
                    type='submit'
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
