import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import './App.css';

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {
   auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends Component {
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        (await userRef).onSnapshot( snapShot => {
          setCurrentUser({
              id: snapShot.id,
                ...snapShot.data()
          })
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    console.log("Finally unmounted")
  }  

  render() {
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/signin' render={() => !(this.props.currentUser) ? (<SignInAndSignUpPage/>) : (<Redirect to='/' />)}></Route>
            <Route path='/shop' component={ShopPage}></Route>
            <Route exact path='/checkout' component={CheckoutPage}></Route>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps =  createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
