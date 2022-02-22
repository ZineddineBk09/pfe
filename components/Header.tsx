import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useStateValue } from '../React-Context-Api/basketContext'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

const categories = [
  'Alimentation',
  'Néttoyage',
  'Cosmétique',
  'Pates a tartinés',
]

function getStyles(category: string, categoryName: string[], theme: Theme) {
  return {
    fontWeight:
      categoryName.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

function Header() {
  const [{ basket }, dispatch] = useStateValue()
  const theme = useTheme()
  const [categoryName, setcategoryName] = React.useState([])

  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event
    setcategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <nav className="flex h-14 items-center bg-slate-700 text-white lg:h-16">
      {/* Logo and title */}
      <div className="flex items-center ">
        <img
          src="https://e7.pngegg.com/pngimages/644/743/png-clipart-a-o-t-wings-of-freedom-eren-yeager-bertholdt-hoover-attack-on-titan-logo-others-angle-emblem.png"
          alt=""
          className="mx-2 h-10 rounded-full md:h-12"
        />
        <h2 className="flex font-bold">
          AOT <span className="ml-1 hidden md:block">Commerce</span>
        </h2>
      </div>

      {/* Search and input */}
      <form className="my-auto ml-2 mr-1 flex flex-1 items-center text-slate-900">
        <input
          type="text"
          className="w-3/6 flex-grow rounded-l border-none px-2 outline-none lg:h-10"
        />
        <button className="border-1 h-6 rounded-r border-black bg-amber-400 px-1 hover:bg-amber-500 md:px-2 lg:h-10 lg:px-3">
          <SearchOutlinedIcon />
        </button>
      </form>

      {/* Categories and options */}
      <div className="max-w-30 mx-5 flex hidden items-center text-white lg:block">
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-category-label" className="text-white">
            Categories
          </InputLabel>
          <Select
            labelId="demo-multiple-category-label"
            id="demo-multiple-category"
            multiple
            value={categoryName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem
                key={category}
                value={category}
                style={getStyles(category, categoryName, theme)}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Sign in and Up */}
      <div className="flex hidden items-center font-bold sm:block md:mx-5">
        <button className="hover:underline">Sign in</button>
        <button className="border-1 mx-2 h-8 rounded border border-black bg-amber-400 px-3 text-slate-900 hover:bg-amber-500 lg:h-12">
          Sign up
        </button>
      </div>

      {/* Basket */}
      <div>
        <Link href={'/checkout'}>
          <div className="hover:cursor-pointer">
            <ShoppingBasketIcon className="h-5 md:h-12" />
            <span className="ml-0 mr-1 font-bold md:ml-2 md:mr-3">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>

      {/* Burger button */}
      <button className="sm:hidden">
        <MenuIcon className="mx-1 h-10 transition duration-200 hover:rotate-90  hover:scale-x-110 hover:ease-in md:mx-3" />
      </button>
    </nav>
  )
}

export default Header
