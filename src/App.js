import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import './App.css';

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'

class App extends Component {
  componentDidMount() {
    console.log(this.props)
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

      setCurrentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }  

  render() {
    console.log(this.props.currentUser)
    return (
      <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/signin' render={() => !(this.props.currentUser) ? (<SignInAndSignUpPage/>) : (<Redirect to='/' />)}></Route>
            <Route path='/shop' component={ShopPage}></Route>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
