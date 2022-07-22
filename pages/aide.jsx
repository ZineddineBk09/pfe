import React from 'react'
const Footer = dynamic(() => import('../components/Footer'))
const Header2 = dynamic(() => import('../components/Header2'))
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import dynamic from 'next/dynamic'

const Aide = () => {
    const router = useRouter()

  return (
    <div className='flex flex-col overflow-x-hidden bg-gray-100'>
      <div className='w-screen max-h-fit py-24 px-4 '>
        <Header2 hideSearch={true} hideBasket={true} hideOptions={true} />
        <button
          className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        <h1 className='text-3xl text-center mb-6'>Aide</h1>
        <div>
          {/* -------------------Annuler une commande------------------- */}
          <div className='bg-white rounded px-6 pt-4 pb-10 w-11/12 mx-auto my-4 border-slate-700 border'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-4 text-amber-500'>
                Annuler une commande
              </h2>
              <img
                src='https://cdn1.vectorstock.com/i/thumb-large/61/10/man-cancel-order-by-finger-on-smartphone-screen-vector-13476110.jpg'
                alt=''
              />
            </div>
            <h3 className='text-xl text-amber-500 mb-2'>
              Comment annuler ma commande
            </h3>
            <p className='font-semibold'>
              Est-ce que je peux annuler ma commande?
            </p>
            <p className='text-slate-700 w-5/6'>
              Oui l&apos;annulation est possible, mais seulement avant que votre
              commande soit « expédiée ». Une fois la commande « expédiée » nous
              ne pouvons plus l&apos;annuler, mais vous pouvez choisir de
              refuser la commande lors de la livraison.
            </p>
            <h3 className='text-xl text-amber-500 my-2'>
              Étapes pour annuler votre commande
            </h3>
            <div className='text-slate-700'>
              <p>
                <span className='font-semibold mr-1'>1.</span>De votre liste de
                commandes sur votre compte <b>client</b> 9odyani, cliquez sur le
                bouton &quot;Annuler la commande&quot; en bas de la commande que
                vous désirez annuler.
              </p>
              <p>
                <span className='font-semibold mr-1'>2.</span>confirmer
                l&apos;annulation.
              </p>
            </div>
          </div>
          {/* -------------------Mode de paiement------------------- */}
          <div className='bg-white rounded px-6 pt-4 pb-10 w-11/12 mx-auto my-4 border-slate-700 border'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-6 text-amber-500'>
                Mode de paiement
              </h2>
              <img
                src='https://cdn1.vectorstock.com/i/thumb-large/56/30/payment-by-cash-for-express-delivery-vector-6535630.jpg'
                alt=''
              />
            </div>
            <div>
              <h3 className='text-xl text-amber-500 mb-2'>
                Paiement à la livraison
              </h3>
              <p className='text-slate-700'>
                Dès l&apos;arrivée du livreur et réception de vos colis, vous
                aurez la possibilité de payer en espèces. Si vous n&apos;êtes
                pas satisfait(e) de votre commande ou rencontrez un problème,
                vous pouvez toujours annuler votre commande dans les étapes
                expliquées ci-dessus.
              </p>
            </div>
          </div>

          {/* -------------------Livrer une commande------------------- */}
          <div className='bg-white rounded px-6 pt-4 pb-10 w-11/12 mx-auto my-4 border-slate-700 border'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-6 text-amber-500'>
                Livrer une commande
              </h2>
              <img
                src='https://img.freepik.com/free-vector/express-courier-scooter-shipping-order_74855-6447.jpg?w=360'
                alt=''
              />
            </div>
            <h3 className='text-xl text-amber-500 mb-2'>
              Comment livrer une commande
            </h3>
            <p className='font-semibold'></p>
            <p className='text-slate-700 w-5/6'>
              La livraison des commandes est exclusive uniquement pour le
              livreur
            </p>
            <h3 className='text-xl text-amber-500 my-2'>
              Étapes pour livrer une commande
            </h3>
            <div className='text-slate-700'>
              <p>
                <span className='font-semibold mr-1'>1.</span>De votre liste de
                livraison sur votre compte <b>livreur</b> 9odyani, cliquez sur
                le bouton &quot;Accepter la commande&quot; en bas de la commande
                que vous désirez annuler.
              </p>
              <p>
                <span className='font-semibold mr-1'>2.</span>confirmer la
                livraison.
              </p>
            </div>
          </div>

          {/* -------------------Compte livreur------------------- */}
          <div className='bg-white rounded px-6 pt-4 pb-10 w-11/12 mx-auto my-4 border-slate-700 border'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-6 text-amber-500'>
                Compte livreur
              </h2>
              <img
                src='https://img.freepik.com/free-vector/express-courier-scooter-shipping-order_74855-6447.jpg?w=360'
                alt=''
              />
            </div>
            <h3 className='text-xl text-amber-500 mb-2'>
              Comment avoir un compte livreur
            </h3>
            <p className='font-semibold'></p>
            <p className='text-slate-700 w-5/6'>
              Le compte livreur n&apos;est créé que par l&apos;entreprise
            </p>
            <h3 className='text-xl text-amber-500 my-2'>
              Étapes pour avoir un compte livreur
            </h3>
            <div className='text-slate-700'>
              <p>
                <span className='font-semibold mr-1'>1.</span>Dirigez-vous vers
                notre centre local &quot;9odyani&quot; dans votre région.
              </p>
              <p>
                <span className='font-semibold mr-1'>2.</span>Remplir le
                formulaire.
              </p>
              <p>
                <span className='font-semibold mr-1'>3.</span>Attendre votre
                tour d&apos;être convoqué pour un entretien.
              </p>
              <p>
                <span className='font-semibold mr-1'>4.</span>Après quelques
                jours, vous recevrez un appel pour vous dire si vous avez été
                accepté ou non.
              </p>
              <p>
                <span className='font-semibold mr-1'>5.</span>Si vous avez été
                accepté, vous recevrez des instructions sur le travail et la
                date à laquelle commencer. et si vous n&apos;avez pas été
                accepté, vous pouvez toujours poster à nouveau.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Aide
