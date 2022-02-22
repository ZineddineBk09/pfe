export const ADD_TO_BASKET = 'ADD_TO_BASKET'
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET'

export const addToBasket = function (product) {
  return {
    type: ADD_TO_BASKET,
    payload: product,
  }
}

export const removeFromBasket = function (id) {
  return {
    type: REMOVE_FROM_BASKET,
    id,
  }
}
