import React from 'react' 
import { connect } from 'react-redux'
import { deleteItem, addItem, subtractItem } from '../../redux/cart/cart.actions'

import './styles.scss'

const CheckoutItem = ({ cartItem, deleteItem, addItem, subtractItem }) => {
  const {name, imageUrl, price, quantity} = cartItem
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={ name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => subtractItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div 
        className="remove-button" 
        onClick={() => deleteItem(cartItem)}
      >&#10005;</div>
    </div>
  )
}

const mapDispatchToProps = dispach => ({
  deleteItem: cartItem => dispach(deleteItem(cartItem)),
  addItem: cartItem => dispach(addItem(cartItem)),
  subtractItem: cartItem => dispach(subtractItem(cartItem))
})

export default connect(null,  mapDispatchToProps)(CheckoutItem)