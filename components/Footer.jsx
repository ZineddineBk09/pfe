import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../public/images/Logo.jpg'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  return (
    <div className='bg-slate-900 min-h-96 min-w-screen '>
      <footer className='px-4 divide-y dark:bg-coolGray-800 text-gray-200'>
        <div className='container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0'>
          <div className='lg:w-1/3'>
            <Link href={'/'} passHref>
              <a className='flex justify-center space-x-3 lg:justify-start'>
                <div className='flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400'>
                  <Image
                    src={Logo}
                    alt=''
                    width='80'
                    height='80'
                    objectFit='cover'
                    className='rounded'
                    priority
                  />
                </div>
                <span className='self-center text-2xl font-semibold uppercase hover:text-amber-300'>
                  9odyani
                </span>
              </a>
            </Link>
          </div>
          <div className='grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 md:grid-cols-4'>
            <div className='space-y-3 '>
              <h3 className='tracking-wide uppercase font-semibold '>
                Produits
              </h3>
              <ul className='space-y-1'>
                <li>
                  <Link
                    href='https://zino-products-api.herokuapp.com/products'
                    passHref
                  >
                    <a className='hover:text-amber-300'>API Public</a>
                  </Link>
                </li>
                <li>
                  <Link href='/client/pages/page_1' passHref>
                    <a className='hover:text-amber-300'>Liste des produits</a>
                  </Link>
                </li>
                <li>
                  <Link href='/client' passHref>
                    <a className='hover:text-amber-300'>Liste des catégories</a>
                  </Link>
                </li>
                <li>
                  <Link href='/client/pages/page_1' passHref>
                    <a className='hover:text-amber-300'>Chercher un produit</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h3 className='tracking-wide uppercase font-semibold'>Société</h3>
              <ul className='space-y-1'>
                <li>
                  <Link href='/politique-confidentialite' passHref>
                    <a className='hover:text-amber-300'>Confidentialité</a>
                  </Link>
                </li>
                <li>
                  <Link href='/politique-confidentialite' passHref>
                    <a className='hover:text-amber-300'>
                      Conditions d&apos;utilisation
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h3 className='uppercase font-semibold'>Développeurs</h3>
              <ul className='space-y-1'>
                <li className='flex '>
                  <Link
                    href='https://www.linkedin.com/in/zineddine-benkhaled-b9b1a8195/'
                    className=' '
                    passHref
                  >
                    <a
                      title='Zineddine Benkhaled'
                      className='hover:text-amber-300'
                    >
                      <LinkedInIcon />
                    </a>
                  </Link>
                  <Link
                    href='https://github.com/ZineddineBk09'
                    className=''
                    passHref
                  >
                    <a
                      title='Zineddine Benkhaled'
                      className='hover:text-amber-300 ml-2'
                    >
                      <GitHubIcon />
                    </a>
                  </Link>
                </li>
                <li className='h-[1px] bg-white w-2/6 '></li>
                <li className='flex '>
                  <Link
                    href='https://www.linkedin.com/in/walid-chebbab-4852a1201/'
                    className=' '
                    passHref
                  >
                    <a title='Walid Chebbab' className='hover:text-amber-300'>
                      <LinkedInIcon />
                    </a>
                  </Link>
                  <Link
                    href='https://github.com/walidchb'
                    className=''
                    passHref
                  >
                    <a
                      title='Walid Chebbab'
                      className='hover:text-amber-300 ml-2'
                    >
                      <GitHubIcon />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <div className='uppercase font-semibold  '>Retrouve-nous sur</div>
              <div className='flex justify-start space-x-3'>
                <Link href='#' title='Facebook' passHref>
                  <a className='flex items-center hover:text-amber-300'>
                    <FacebookIcon />
                  </a>
                </Link>
                <Link href='#' title='Twitter' passHref>
                  <a className=' flex items-center hover:text-amber-300'>
                    <TwitterIcon />
                  </a>
                </Link>
                <Link href='#' title='Instagram' passHref>
                  <a className=' flex items-center hover:text-amber-300'>
                    <InstagramIcon />
                  </a>
                </Link>
              </div>
            </div>
            <div className='space-y-3'>
              <h3 className='tracking-wide uppercase font-semibold'>
                commandes
              </h3>
              <ul className='space-y-1'>
                <li>
                  <Link
                    href='https://zino-products-api.herokuapp.com/categories'
                    passHref
                  >
                    <a className='hover:text-amber-300'>API Public</a>
                  </Link>
                </li>
                <li>
                  <Link href='/aide' passHref>
                    <a className='hover:text-amber-300'>Annuler une commande</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h3 className='tracking-wide uppercase font-semibold'>
                livraison
              </h3>
              <ul className='space-y-1'>
                <li>
                  <Link href='/aide' passHref>
                    <a className='hover:text-amber-300'>Livrer une commande</a>
                  </Link>
                </li>
                <li>
                  <Link href='/aide' passHref>
                    <a className='hover:text-amber-300'>Compte livreur</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h3 className='tracking-wide uppercase font-semibold'>
                mode de paiement
              </h3>
              <ul className='space-y-1'>
                <li>
                  <Link href='/aide' passHref>
                    <a className='hover:text-amber-300 flex itemd-center'>
                      <p className='mr-2'>Paiement à la livraison</p>
                      <Image
                        src='https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/Cash_on_Delivery-send-delivery-give_money-4-512.png'
                        alt=''
                        width='20'
                        height='20'
                        objectFit='cover'
                        className='rounded bg-white hover:bg-amber-300'
                        priority
                      />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='py-6  text-center '>
          <p className='hover:text-amber-300 hover:cursor-pointer py-4'>
            © 2022 Copyrights <b>9odyani</b>. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
