import {
  ADD_TO_BASKET,
  CLEAR_BASKET,
  REMOVE_FROM_BASKET,
} from './Actions/basketActions'
import {
  FILTER_PRODUCTS,
  UNFILTER_PRODUCTS,
  SEARCH_PRODUCTS,
  UPDATE_QUANTITY,
} from './Actions/productsActions'
import {
  SET_CLIENT_SESSION,
  REMOVE_CLIENT_SESSION,
} from './Actions/clientActions'
import { SET_RIDER_SESSION, REMOVE_RIDER_SESSION } from './Actions/riderActions'
import { setCookie, removeCookie } from '../lib/useCookie'

export const initialState = {
  basket: [],
  products: [],
  filteredProducts: [],
  client: {},
  rider: {},
}

//Selector
//0 is initial value of amount
export const getBasketTotal = (basket) =>
  //counting the total of basket
  basket?.reduce((amount, item) =>
    //check if the products have discount

    {
      //if the product has discount
      if (item.promotion != '0%') {
        //calculate the total of the product after discount
        const newItemTotal = Math.floor(
          parseInt(item.price?.replace(',', '').split(' ')[0]) -
            (parseInt(item.price?.replace(',', '').split(' ')[0]) *
              parseInt(item?.promotion.split('%')[0])) /
              100
        )
        //return the total of the product
        return amount + newItemTotal * parseInt(item.quantity)

        //if the product doesn't have discount
      } else {
        return (
          parseInt(item.price?.replace(',', '').split(' ')[0]) *
            parseInt(item.quantity) +
          amount
        )
      }
    }, 0)

//The reducer is always listening and when we dispatch an action t's gonna get manipulated by the reducer and do some actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      console.log('ADD_TO_BASKET : ')

      //check if the product is already in the basket
      const isProductInBasket = state.basket.find(
        (product) => product.id == action.payload.id
      )
      //if the product is already in the basket we break
      if (isProductInBasket) {
        break
      }

      //remove old basket and add the new one to the cookie
      removeCookie('basket')
      setCookie('basket', [...state.basket, action.payload])

      return { ...state, basket: [...state.basket, action.payload] }

    case REMOVE_FROM_BASKET:
      console.log('REMOVE_FROM_BASKET')
      //"findIndex" will find only the first item that match the id and it's going to return it
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )

      let newBasket1 = [...state.basket]
      if (index >= 0) {
        //we found it, and remove it

        newBasket1.splice(index, 1)
      } else {
        console.log(
          `Can't remove the product (id: ${action.id}) as it's not in your basket.`
        )
      }

      //remove old basket and add the new one to the cookie
      removeCookie('basket')
      setCookie('basket', newBasket1)

      return { ...state, basket: newBasket1 }

    case UPDATE_QUANTITY:
      console.log('UPDATE_QUANTITY')

      const newBasket2 = state.basket.map((product) =>
        product.id === action.payload.id && product.name === action.payload.name
          ? action.payload
          : product
      )

      //remove old basket and add the new one to the cookie
      removeCookie('basket')
      setCookie('basket', newBasket2)

      return {
        ...state,
        basket: newBasket2,
      }

    case CLEAR_BASKET:
      //remove the basket from localStorage after we validate the order
      removeCookie('basket')
      return { ...state, basket: [] }

    case SEARCH_PRODUCTS:
      return { ...state, products: action.payload }

    case FILTER_PRODUCTS:
      return { ...state, filteredProducts: action.payload }

    case UNFILTER_PRODUCTS:
      return { ...state, filteredProducts: [] }

    case SET_CLIENT_SESSION:
      //create a cookie with the client session and delete the old one
      removeCookie('clientSession')

      setCookie('clientSession', action.payload)
      return { ...state, client: action.payload }

    case REMOVE_CLIENT_SESSION:
      //remove the client session from the cookies
      removeCookie('clientSession')
      return { ...state, client: {} }

    case SET_RIDER_SESSION:
      //create a cookie with the RIDER session
      removeCookie('riderSession')
      setCookie('riderSession', action.payload)
      return { ...state, rider: action.payload }

    case REMOVE_RIDER_SESSION:
      //remove the RIDER session from the cookie
      removeCookie('riderSession')
      return { ...state, rider: {} }

    default:
      return state
  }
}

export default reducer
