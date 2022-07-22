import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
const NotificationsPage = dynamic(() =>
  import('../../components/client/NotificationsPage')
)
const Header2 = dynamic(() => import('../../components/Header2'))
import { useStateValue } from '../../React-Context-Api/context'
import { getCookie } from '../../lib/useCookie'
import dynamic from 'next/dynamic'

const Notifications = () => {
  const [user, setUser] = useState({})
  const [{ client }, dispatch] = useStateValue()

  const router = useRouter()
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    console.log('-------- client notifications page --------')
    setUser(getCookie('clientSession'))
  }, [client])

  useEffect(() => {
    //fetche the client orders
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/clients/clientNotifications`, {
          method: 'POST',
          body: JSON.stringify({
            clientId: user.id,
          }),
        })
        await response.json().then((data) => {
          setNotifications(data)
        })
      } catch (err) {
        //alert(err)
        console.error(err)
      }
    }
    fetchNotifications()
  }, [user])

  if (user.provider == 'client-provider') {
    return (
      <div>
        <Header2 hideSearch={true} />
        <NotificationsPage notifications={notifications} />
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

export default Notifications
