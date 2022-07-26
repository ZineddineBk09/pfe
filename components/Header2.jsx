import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
//import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import InventoryIcon from '@mui/icons-material/Inventory'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonIcon from '@mui/icons-material/Person'
import { filterProducts } from '../React-Context-Api/Actions/productsActions'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import HelpIcon from '@mui/icons-material/Help'
import { getCookie, removeCookie } from '../lib/useCookie'
//import Sidebar from './Sidebar'
import { useStateValue } from '../React-Context-Api/context'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Logo from '../public/images/Logo.jpg'

function Header({ hideSearch, hideBasket, hideOptions }) {
  const [suggestions, setSuggestions] = useState([])
  const [{ basket, client }, dispatch] = [...useStateValue()] || []
  const [searchTerm, setSearchTerm] = useState('')
  //logged user session
  const [user, setUser] = useState({})
  const [localBasket, setLocalBasket] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  //filter products after we search
  const [filteredProducts, setFilteredProducts] = useState([])

  //Get the updated Basket and Client
  useEffect(() => {
    function updateBasketAndClient() {
      setLocalBasket(getCookie('basket'))
      setUser(getCookie('clientSession'))
      //console.log('user : ', user)
    }
    updateBasketAndClient()
  }, [basket, client])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submit Search Form')

    if (searchTerm.length > 0) {
      try {
        const response = await fetch(`/api/products/searchProducts`, {
          method: 'POST',
          body: JSON.stringify({
            query: searchTerm,
          }),
        })
        await response.json().then((data) => {
          setFilteredProducts(data)
          dispatch(filterProducts(data))
        })
      } catch (err) {
        //alert(err)
        console.error(err)
      }

      setSearchTerm('')
      setSuggestions([]) //hide the suggestions bar
    }
  }

  const fetchSuggestions = async () => {
    //fetch the suggestions based on the search term
    try {
      const response = await fetch(`/api/products/productsAutoComplete`, {
        method: 'POST',
        body: JSON.stringify({
          query: searchTerm,
        }),
      })
      await response.json().then((data) => {
        setSuggestions(data)
      })
    } catch (err) {
      //alert(err)
      console.error(err)
    }
  }

  const handleChange = async (e) => {
    setSearchTerm(e.target.value.toLowerCase())
    searchTerm?.length >= 2 ? await fetchSuggestions() : setSuggestions([])
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  const handleSignOut = () => {
    //deleting the rider session cookie
    removeCookie('clientSession')

    signOut({ callbackUrl: '/' })
  }

  const [profilePicture, setProfilePicture] = useState('')
  //get the user profile picture from the database with the api/clients/getClientImage
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/clients/getClientImage`, {
          method: 'POST',
          body: JSON.stringify({
            clientId: user?.id || client?.id,
          }),
        })
        await response.json().then((data) => {
          setProfilePicture(data)
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchImage()
  }, [user?.id, client?.id])

  return (
    <nav
      className='fixed top-0 left-0 right-0 flex justify-between h-14 w-full items-center bg-slate-900 text-white lg:h-16 z-30 shadow-md shadow-amber-400'
      onClick={() => setSuggestions([])}
    >
      {/* Logo and title */}
      {/* check if the window url contains "client" */}

      <Link href={'/'} passHref>
        <a className='flex items-center p-4 mr-auto'>
          <Image
            src={Logo}
            alt=''
            width='45'
            height='45'
            priority
            objectFit='cover'
            className='rounded'
          />
          <h2 className='flex font-semibold mx-2 hover:bg-gray-800 rounded-full p-1 uppercase text-xl md:block hidden'>
            9odyani
          </h2>
        </a>
      </Link>

      {!hideSearch && (
        <form
          className='my-auto mx-auto flex max-w-3xl flex-1 items-stretch text-slate-900'
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <input
            type='text'
            className='w-5/6 rounded-l border-none px-2 outline-none h-10'
            placeholder='Cherchez un produit, une marque ou une catégorie'
            value={searchTerm}
            onChange={handleChange}
          />

          <button
            className='border-1 rounded-r border-black bg-amber-400 px-1 hover:bg-amber-500 md:px-2 h-10 lg:px-3 '
            type='submit'
          >
            <SearchOutlinedIcon />
          </button>
        </form>
      )}
      <div
        className={`fixed z-40 top-14 left-60 right-80 ${
          !suggestions && 'hidden'
        }`}
      >
        {suggestions?.length >= 2 && (
          <ul className='flex overflow-hidden flex-col rounded border border-slate-700'>
            {suggestions.map(({ id, name, img }) => (
              <li key={id}>
                <Link href={`/client/products/${id}`} passHref>
                  <a className='flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer bg-white'>
                    {/* Avoid long products name by truncating them to max length = 100 */}
                    <p className='text-gray-600 mr-4'>{truncate(name, 70)}</p>
                    <Image src={img} alt={name} height={40} width={35} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ----------Authentication + Options------------ */}
      {!hideOptions && (
        <div className='relative ml-auto'>
          <div className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg group hover:text-amber-500 '>
            {user ? (
              <div className='flex items-center justify-between'>
                <img
                  src={
                    profilePicture.image ||
                    'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
                  }
                  alt=''
                  className='rounded-full w-10 h-10 mx-4 object-contain hover:cursor-pointer'
                  onClick={() => setShowOptions(!showOptions)}
                  title='Profile'
                />
                <p className='text-white'>
                  Bonjour,
                  <span className='font-semibold'> {user.name}</span>
                </p>
              </div>
            ) : (
              <div>
                <Link href='/client/auth/signin' passHref>
                  <a
                    className={
                      'text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                    }
                  >
                    S&apos;identifier
                  </a>
                </Link>
              </div>
            )}
            <button
              className='text-white text-xs ml-2 p-1 rounded-full hover:bg-gray-800 '
              onClick={() => setShowOptions(!showOptions)}
            >
              {showOptions ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>
          </div>

          {/* Notifications */}
          {showOptions && (
            <ul className='fixed bg-white text-slate-700 rounded top-12 border border-slate-600'>
              <li className='flex justify-between items-center hover:bg-gray-100 '>
                <Link href='/checkout' passHref>
                  <a className='capitalize text-sm p-3'>
                    <span className='mr-2'>
                      <ShoppingCartIcon />
                    </span>
                    <span>Panier</span>
                    <span className='px-1 py-0.5 text-right bg-amber-400 font-bold rounded-full ml-12 mx-auto'>
                      {localBasket?.length || 0}
                    </span>
                  </a>
                </Link>
              </li>
              {user && (
                <li className='flex justify-between items-center hover:bg-gray-100 '>
                  <Link href='/client/profile' passHref>
                    <a className='capitalize text-sm p-3'>
                      <span className='mr-2'>
                        <PersonIcon />
                      </span>
                      <span>Profile</span>
                    </a>
                  </Link>
                </li>
              )}
              <li className='flex justify-between items-center hover:bg-gray-100 '>
                <Link
                  href={user ? '/client/notifications' : '/client/auth/signin'}
                  passHref
                >
                  <a className='capitalize text-sm p-3'>
                    <span className='mr-2'>
                      <NotificationsIcon />
                    </span>
                    notifications
                  </a>
                </Link>
              </li>
              {/* Orders */}
              <li className='flex justify-between items-center hover:bg-gray-100 '>
                <Link
                  href={user ? '/client/orders' : '/client/auth/signin'}
                  passHref
                >
                  <a className='capitalize text-sm p-3'>
                    <span className='mr-2'>
                      <InventoryIcon />
                    </span>
                    mes commandes
                  </a>
                </Link>
              </li>
              {/* Aide */}
              <li className='flex justify-between items-center hover:bg-gray-100 '>
                <Link href='/aide' passHref>
                  <a className='capitalize text-sm p-3'>
                    <span className='mr-2'>
                      <HelpIcon />
                    </span>
                    aide
                  </a>
                </Link>
              </li>
              {/* Deconnécte */}
              {user && (
                <li
                  className='flex justify-between items-center hover:bg-gray-100 border-t
                '
                >
                  <Link href='' passHref>
                    <button
                      className='capitalize text-sm p-3 text-red-500'
                      onClick={() => handleSignOut()}
                    >
                      <span className='mr-2'>
                        <LogoutIcon />
                      </span>
                      déconnecter
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {/* Basket */}
      {!hideBasket && (
        <div className='mx-2 hidden md:block '>
          <Link href={'/checkout'} passHref>
            <a className='hover:cursor-pointer'>
              <ShoppingCartIcon className='h-5 text-3xl md:h-12 hover:bg-slate-800 hover:text-amber-400 rounded-full p-1' />
              <span className='text-amber-600 ml-0 mr-1 font-bold md:ml-2 md:mr-3'>
                {localBasket?.length || 0}
              </span>
            </a>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Header
