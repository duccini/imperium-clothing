import { combineReducers } from 'redux'
import cartReducer from './cart/cart.reducer'

import userReducer from './user/user.reducer'

/**
 * rootReducer -> base reducer
 */

export default combineReducers({
  user: userReducer,
  cart: cartReducer
})