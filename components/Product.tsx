import React from 'react'
import Rating from '@mui/material/Rating'
import { useStateValue } from '../React-Context-Api/basketContext'
import { addToBasket } from '../React-Context-Api/basketActions'

function Product({ product }) {
  const { img, name, price, rating } = { ...product }
  const [{ basket }, dispatch] = useStateValue()

  return (
    <div className="flex rounded bg-white p-5 shadow-xl md:flex-col md:justify-evenly ">
      <img
        src={img}
        alt=""
        className="mr-2 h-80 object-contain hover:cursor-pointer"
      />
      <div>
        <p>{name}</p>
        <Rating
          name="read-only"
          value={rating.split(' ')[0]}
          precision={0.5}
          readOnly
        />
        <p>{price}</p>
        <button
          className="mt-5 text-sm border border-amber-500 bg-amber-300 p-1 hover:border-amber-600 hover:bg-amber-500"
          onClick={() => dispatch(addToBasket(product))}
        >
          Add to Basket
        </button>
      </div>
    </div>
  )
}

export default Product
