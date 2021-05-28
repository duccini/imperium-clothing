import React from 'react'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './styles.scss'

const CartIcon = ({ toggleCartHidden, itemsCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon"></ShoppingIcon>
    <span className="item-count">{itemsCount}</span>
  </div>
)

// selector in Redux
const mapStateToProps = (state) => ({
  itemsCount: selectCartItemsCount(state)
})

const mapDispatchToProps = dispach => ({
  toggleCartHidden: () => dispach(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)