import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {

        console.log('Fired!')
        event.preventDefault();
        
        const { displayName, email, password, confirmPassword } = this.state;

        if( password !== confirmPassword ) {
            alert('passwords dont match');
            return;
        }

        // console.log(  displayName, email, password, confirmPassword)

        try {
            const { user } = await auth.createUserWithEmailAndPassword( email, password);


            createUserProfileDocument( user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
        }
    } 

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value})
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form action="" className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }

}

export default SignUp;

