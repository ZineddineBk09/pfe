import React from 'react'
const Footer = dynamic(() => import('../components/Footer'))
const Header = dynamic(() => import('../components/Header'))
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import dynamic from 'next/dynamic'

const PolitiqueConf = () => {
  const router = useRouter()

  return (
    <div className='flex flex-col overflow-x-hidden bg-gray-100'>
      <div className='w-screen max-h-fit py-24 px-4 '>
        <Header hideSearch={true} hideBasket={true} hideOptions={true} />
        <button
          className='text-xl font-semibold md:text-3xl mr-2 px-2 hover:bg-gray-200 rounded-full fixed top-20'
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        <h1 className='text-3xl text-center mb-6'>
          Confidentialité et Conditions d&apos;utilisation
        </h1>
        <div>
          {/* -------------------Annuler une commande------------------- */}
          <div className='bg-white rounded px-6 pt-4 pb-10 w-11/12 mx-auto my-4 border-slate-700 border'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl text-center my-4 text-amber-500'>
                Confidentialité
              </h2>
              <img
                src='https://static.vecteezy.com/ti/vecteur-libre/t2/4264729-politique-de-confidentialite-concept-proteger-votre-confidentialite-vector-illustration-flat-vectoriel.jpg'
                alt=''
              />
            </div>
            {/* --------------À propos-------------- */}
            <div>
              <h3 className='font-semibold text-md text-amber-500 mb-2'>
                <span className=' mr-3'>1.</span>À propos
              </h3>

              <p className='text-slate-700 w-5/6 ml-4'>
                Cette notification de confidentialité et de cookies fournit des
                informations sur la façon dont 9odyani collecte et traite vos
                données personnelles lorsque vous visitez notre site Web .
              </p>
            </div>

            {/* --------------Les données que nous collectons
                sur vous-------------- */}
            <div>
              <h3 className='font-semibold text-md text-amber-500 mb-2'>
                <span className=' mr-3'>2.</span>Les données que nous collectons
                sur vous
              </h3>

              <p className='text-slate-700 w-5/6 ml-4'>
                Nous collectons vos données personnelles afin de fournir et
                d&apos;améliorer continuellement nos produits et services. Nous
                pouvons collecter, utiliser, stocker et transférer les
                différents types de données personnelles suivantes vous
                concernant:
                <ul className='ml-8 my-2'>
                  <li>
                    - Informations que vous nous fournissez: nous recevons et
                    stockons les informations que vous nous fournissez, y
                    compris vos données d&apos;identité, vos coordonnées, votre
                    adresse de livraison et vos données financières.
                  </li>
                  <li>
                    - Informations sur votre utilisation de notre site Web :
                    nous collectons et stockons automatiquement certains types
                    d&apos;informations concernant votre utilisation du site
                    Jumia (marketplace), y compris des informations sur vos
                    recherches, vues, téléchargements et achats.
                  </li>
                </ul>
              </p>
            </div>

            {/* --------------Les cookies et comment nous les utilisons-------------- */}
            <div>
              <h3 className='font-semibold text-md text-amber-500 mb-2'>
                <span className=' mr-3'>3.</span>Les cookies et comment nous les
                utilisons
              </h3>
              <p className='text-slate-700 w-5/6 ml-4' />
              <p className='text-slate-700 w-5/6 ml-4'>
                <p>
                  Un cookie est un petit fichier de lettres et de chiffres que
                  nous mettons sur votre ordinateur si vous y consentez.
                </p>
                Les cookies nous permettent de vous distinguer des autres
                utilisateurs de notre site Web , ce qui nous aide à vous offrir
                une expérience de navigation améliorée. Par exemple, nous
                utilisons des cookies aux fins suivantes:
                <ul className='ml-8 my-2'>
                  <li>
                    - Informations que vous nous fournissez: nous recevons et
                    stockons les informations que vous nous fournissez, y
                    compris vos données d&apos;identité, vos coordonnées, votre
                    adresse de livraison et vos données financières.
                  </li>
                  <li>
                    - Informations sur votre utilisation de notre site Web :
                    nous collectons et stockons automatiquement certains types
                    d&apos;informations concernant votre utilisation du site
                    9odyani.
                  </li>
                </ul>
              </p>
            </div>

            {/* --------------Comment nous utilisons vos données personnelles-------------- */}

            <div>
              <h3 className='font-semibold text-md text-amber-500 mb-2'>
                <span className=' mr-3'>4.</span>Comment nous utilisons vos
                données personnelles
              </h3>
              <p className='text-slate-700 w-5/6 ml-4'>
                Nous utilisons vos données personnelles pour exploiter, fournir,
                développer et améliorer les produits et services que nous
                proposons, notamment les suivants:
                <ul className='ml-8 my-2'>
                  <li>- Vous inscrire en tant que nouveau client.</li>
                  <li>
                    - Amélioration de notre site Web, de nos applications,
                    produits et services.
                  </li>
                  <li>
                    - Respecter nos obligations légales, y compris vérifier
                    votre identité si nécessaire.
                  </li>
                  <li>- Détecter les fraudes.</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PolitiqueConf
