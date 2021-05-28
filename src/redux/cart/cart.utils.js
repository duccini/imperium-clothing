// Adicionar itens em cartItems
export const addItemToCart = (cartItems, newItem) => {
  // verifica se o item existe no array de items
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === newItem.id
    )

  // o item já existe no cart, encontrar o item e aumentar a qnt
  if(existingCartItem) {
    // retorna um novo obj  para que o comp seja re-render
    return cartItems.map(cartItem =>
      cartItem.id === newItem.id
      // item existente
      ? {...cartItem, quantity: cartItem.quantity + 1}
      // demais itens
      : cartItem
    )
  } 

  // o item nao existe no carrinho
  return [...cartItems, {...newItem, quantity:1}]
}

// Subtrair itens
export const subtractItemFromCart = (cartItems, itemToSubtract) => {

  // procura itemToSubtract no cartItems
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === itemToSubtract.id
  )

  // se a qnt = 1, remover itemToSubtract
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(
      cartItem => cartItem.id !== itemToSubtract.id
    )
  }

  /**
   * busca itemToSubtract no cartItems
   * qndo encontra, retorna o item com qnt - 1
   * retorna os outros items como estão
   */
  return cartItems.map(
    cartItem => cartItem.id === itemToSubtract.id

    //
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  )
}