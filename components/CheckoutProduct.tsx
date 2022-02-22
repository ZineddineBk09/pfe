import React from 'react'
import Rating from '@mui/material/Rating'
import { removeFromBasket } from '../React-Context-Api/basketActions'
import { useStateValue } from '../React-Context-Api/basketContext'

function CheckoutProduct({ product }) {
  const [{ basket }, dispatch] = useStateValue()
  const { id, img, name, price, rating } = { ...product }
  return (
    <div className="flex rounded bg-white p-5 ">
      <img
        src={img}
        alt=""
        className="h-40 sm:h-60 object-contain hover:cursor-pointer"
      />
      <div className='ml-3'>
        <p>{name}</p>
        <Rating
          name="read-only"
          value={rating?.split(' ')[0]}
          precision={0.5}
          readOnly
        />
        <p>{price}</p>
        <button
          className="mt-5 border border-amber-500 bg-amber-300 p-1 text-sm hover:border-amber-600 hover:bg-amber-500"
          onClick={() => dispatch(removeFromBasket(id))}
        >
          Remove from Basket
        </button>
      </div>
    </div>
  )
}

export default CheckoutProduct
