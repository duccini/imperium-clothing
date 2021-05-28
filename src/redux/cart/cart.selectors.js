import { createSelector } from 'reselect'

/**
 * Reselect utiliza memoization, especie de cache para os selector que previne
 * que comp com as mesmas props sejam re-render qndo uma parte do state que eles
 * nao utilizam seja alterada
 * 
 * Com reselect, apenas os comp cujas props realmente mudam sao re-render
 */

/**
 * existem 2 tipos de selectors:
 * 1º input selector, nao utiliza createsSelector
 * 2º output selector, usa createsSelector
 */

/**
 * createSelector() recebe 2 FUNÇÕES:
 * 1ª parte do objeto monitorada que quando se alterada, chamam a 2 função 
 * 2ª função que é chamada qndo a parte do estado monitorada se aletra
 */

/**
 * Imput selector
 * objectos do state que serão monitorados
 */
const cartSelector = state => state.cart

// output selector - memoize selector
export const selectCartItems = createSelector(
  [cartSelector], // colection of input selector
  (cart) => cart.cartItems 
)

export const selectCartHidden = createSelector(
  [cartSelector],
  cart => cart.hidden
)

/**
 * output selector 
 * a gente recebe o estado do redux por inteiro e retorna qual parte queremos
 * monitorar para qndo ela for alterada a gente ter acesso aqui
 */
// output selector 
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((accumulater, cartItem) => (
    accumulater + cartItem.quantity
  ), 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((accumulater, cartItem) => (
    accumulater + cartItem.quantity * cartItem.price
  ), 0)
)

