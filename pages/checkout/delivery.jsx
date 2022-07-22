import React, { useEffect, useState } from 'react'
const OrderCard = dynamic(() => import('../../components/OrderCard'))
const Header2 = dynamic(() => import('../../components/Header2'))
const PayementForm = dynamic(() =>
  import('../../components/forms/PayementForm')
)
import { useRouter } from 'next/router'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getCookie } from '../../lib/useCookie'
import { useStateValue } from '../../React-Context-Api/context'
import dynamic from 'next/dynamic'

const Delivery = () => {
  const [user, setUser] = useState({})
  const router = useRouter()
  const [{ client }, dispatch] = useStateValue()

  useEffect(() => {
    console.log('-------- Delivery page --------')
    setUser(getCookie('clientSession'))
    console.log('Session.client : ', user)
  }, [client])

  if (user?.provider == 'client-provider') {
    return (
      <div className=' bg-gray-100 relative p-2 overflow-x-scroll'>
        <Header2 hideSearch={true} />
        <button
          className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        <div className='mt-14 lg:mt-16 flex flex-col lg:flex-row'>
          <PayementForm />
          <OrderCard />
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-between p-8 items-center h-screen'>
        <p className='text-4xl mb-2'>Vous n&apos;êtes pas authentifié.</p>
        <Link href='/client/auth/signin' passHref>
          <p>
            Veuillez vous authentifier à nouveau,
            <a className='text-amber-500 hover:underline hover:cursor-pointer ml-[4px]'>
              S&apos;identifier?
            </a>
          </p>
        </Link>
      </div>
    )
  }
}

export default Delivery
