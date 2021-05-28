import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CustomButtom from '../CustomButton'
import CartItem from '../CartItem'

import './styles.scss'

const CartDropDrown = ({cartItems, history, dispatch}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        cartItems.length ?
        cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
        : <span className="empty-message">Your cart is empty</span>
      }
    </div>
    <CustomButtom onClick={() => {
      history.push('/checkout')
      dispatch(toggleCartHidden())
    }}>GO TO CHECKOUT</CustomButtom>
  </div>
)

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
})

/**
 * dispatch possui 2 jeitos
 * 1) Criando a func mapDispatchToProps(), passando ela no connect e depois 
 * chamando a func toggleCartHidden no comp
 * 
 * 2) Recebendo a props dispatch passada automaticamente pelo connect no comp
 * e chamando dispatch(toggleCartHidden() no comp
 */

// const mapDispatchToProps = dispach => ({
//   toggleCartHidden: () => dispach(toggleCartHidden())
// })

/**
 * HOC retornam e aceitam componentes como argumentos
 * a ordem de encapsulamento dos HOC importa
 * HOC evaluetes from inside out, dentro para fora
 */

export default  withRouter(connect(mapStateToProps)(CartDropDrown))