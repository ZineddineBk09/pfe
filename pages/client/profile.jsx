import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import ProfilePage from '../../components/client/ProfilePage'
import Header2 from '../../components/Header2'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { connectToDatabase } from '../../lib/mongodb'

const Profile = ({ client }) => {
  const router = useRouter()

  return (
    <div>
      <Header2 />
      <button
        className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </button>
      <ProfilePage client={client} />
    </div>
  )
}

export default Profile

//fetch client Profile data
export async function getServerSideProps(context) {
  let { db } = await connectToDatabase()
  //get auth session cookie
  const session = await getSession(context)

  //get number of orders for the client
  const nbOrders = await db
    .collection('orders')
    .find({ clientId: session?.user?.id })
    .count()

  return {
    props: {
      client: { ...session.user, nbOrders },
    },
  }
}
