import { addItemToCart, subtractItemFromCart } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'TOGGLE_CART_HIDDEN':
      return {
        ...state,
        hidden: !state.hidden
      }
    case 'ADD_ITEM':
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      }
    case 'SUBTRACT_ITEM':
      return {
        ...state,
        cartItems: subtractItemFromCart(state.cartItems, action.payload)
      }
    default:
      return state
  }
}

export default cartReducer

/**
 * filter() retorna todos os elem. do array que passa a condição da cbf
 */