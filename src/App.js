import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import './App.css';

import HomePage from './pages/Homepage';
import ShopPage from './pages/Shop';
import Login from './pages/Login';
import CheckOutPage from './pages/Checkout'

import Header from './components/Header/';
import { auth, createUserProfile } from './firebase/firebase.utils';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null;

  /**
   * onAuthStateChanged é um observador que garante que Auth() não esteja em um
   * estado intermediário, i.e., userAuth representa o usuário conectado ou null
   */

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      // usuario logado, state registra os dados do usuario
      if(userAuth) {
        const userRef = await createUserProfile(userAuth)

        // subscribe for any change in database
        userRef.onSnapshot(snapshot => {
          // this.setState({ 
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // }, () => console.log(this.state));

          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        // usuario nao esta logado, user = null
        // this.setState({
        //   currentUser: userAuth}, // currentUser = null
        //   () => console.log(this.state)) 

        setCurrentUser(userAuth)
      }
      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckOutPage} />
          <Route exact path='/login' render={
            () => this.props.currentUser ? (<Redirect to="/" />) : (<Login />)
          } />
        </Switch>
      </div>
    );
  }
}

/** 
 * dispach é uma func passada pela store como um parametro para a func 
 * mapDispatchToProps
 * 
 * action -> setCurrentUser(user)
 * 
 * we are dispatching action 'SET_CURRENT_USER' whenever we cal the 
 * func setCurrentUser, which is attached to props of the App comp, this is why
 * we use const { setCurrentUser } = this.props
 * 
 * the 'user' param of the func setCurrentUser() will be passing when the func
 * is call
 * 
 * se não existir mapDispatchToProps como 2 par, connect passará a func dispatch
 * 
 */

/**
 *  { user } -> state.user
 */

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispach => ({
  setCurrentUser: user => dispach(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
