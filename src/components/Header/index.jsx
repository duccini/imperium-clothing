import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom';

import CartIcon from '../CartIcon/'
import CartDropDrown from '../CartDropDrown'
import { auth } from '../../firebase/firebase.utils';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './styles.scss';

/** 
 * connect é um HOC permite modificar o nosso comp para acessar coisas relativas
 *  ao redux
 */

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/login'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {
      hidden ? null : <CartDropDrown />
    }
  </div>
);

/**
 * HOC connect() aceita 2 funções, sendo a 2 opcional
 * A 1ª função que permite acessar o state, rootReducer
 */

/** 
 * comp subscribe to store
 * mapStateToProps diz qual parte do estado deve ser inserino nas props do comp
 */

/**
 * createStructuredSelector() passa automaticamente o estado de nivel 
 * superior para cada selector
 */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
