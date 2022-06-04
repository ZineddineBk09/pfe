import React, { useEffect, useState } from 'react'
import { App, Credentials } from 'realm-web'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Footer = dynamic(() => import('../../components/Footer'))
const Header = dynamic(() => import('../../components/Header'))
const OrdersPage = dynamic(() => import('../../components/client/OrdersPage'))
import { getCookie } from '../../lib/useCookie'
import { useStateValue } from '../../React-Context-Api/context'
import dynamic from 'next/dynamic'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState({})
  const [{ client }, dispatch] = useStateValue()

  useEffect(async () => {
    await fetch('/api/orders', {
      method: 'some',
      body: {},
    })
  }, [])

  useEffect(() => {
    console.log('-------- client orders page --------')
    setUser(getCookie('clientSession'))
  }, [client])

  console.log('client orders  : ', user)

  useEffect(() => {
    //fetche the client orders
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/clients/clientOrders`, {
          method: 'POST',
          body: JSON.stringify({
            clientId: user.id,
          }),
        })
        await response.json().then((data) => {
          setOrders(data)
        })
      } catch (err) {
        alert(err)
      }
    }
    fetchOrders()
  }, [user])

  console.log('orders : ', orders)

  if (user.provider == 'client-provider') {
    return (
      <div>
        <Header hideSearch={true} />
        <OrdersPage orders={orders} />
        <Footer />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-between p-8 items-center h-screen'>
        <p className='text-4xl mb-2'>Loading...</p>
        <Link href='/client/auth/signin' passHref>
          <p>
            Vous devrez peut-être vous connecter à votre compte,
            <a className='text-amber-500 hover:underline hover:cursor-pointer'>
              S&apos;identifier?
            </a>
          </p>
        </Link>
      </div>
    )
  }
}

export default Orders
