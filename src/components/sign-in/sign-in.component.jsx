import React, { Component } from 'react';

import { signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    } 

    handleSubmit = e => {
        e.preventDefault();
        
        console.log('working?')
        this.setState({
            password: '',
            email: ''
        })
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState( { [name]:value } );
    }

    handleSignIn = e => {
        e.preventDefault();
        
        signInWithGoogle()
        .catch( err => console.log(err));
    } 
    

    render() {
        return (
          <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={this.state.email}
                handleChange={this.handleChange}
                label="email"
                required
              />

              <FormInput
                type="password"
                name="password"
                value={this.state.password}
                handleChange={this.handleChange}
                label="password"
                required
              />
              
              <div className="buttons">
                <CustomButton type="submit">Sign In</CustomButton>
                <CustomButton onClick={this.handleSignIn} isGoogleSignedIn>
                  Sign In with Google
                </CustomButton>
              </div>
            </form>
          </div>
        );
    }
}

export default SignIn;