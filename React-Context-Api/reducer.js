import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from './basketActions'

//Basket empty
export const initialState = {
  basket: [],
}

//Selector
//0 is initial value of amount
export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => parseInt(item.price?.split(' ')[0]) + amount,
    0
  )

//The reducer is always listening and when we dispatch an action t's gonna get manipulated by the reducer and do some actions
const reducer = (state = sessionStorage.getItem('basket'), action) => {
  console.log('Reducer Is WOrking : ', action.type)
  switch (action.type) {
    case ADD_TO_BASKET:
      console.log('ADD_TO_BASKET')
      sessionStorage.removeItem('basket')
      sessionStorage.setItem('basket', JSON.stringify([...state.basket, action.payload]))
      return { ...state, basket: [...state.basket, action.payload] }

    case REMOVE_FROM_BASKET:
      console.log('REMOVE_FROM_BASKET')
      //"findIndex" will find only the first item that match the id and it's going to return it
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )

      let newBasket = [...state.basket]
      if (index >= 0) {
        //we found it, and remove it
        sessionStorage.removeItem('basket')
        sessionStorage.setItem('basket', newBasket)

        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Can't remove the product (id: ${action.id}) as it's not in your basket.`
        )
      }
      return { ...state, basket: newBasket }
    default:
      return state
  }
}

export default reducer
