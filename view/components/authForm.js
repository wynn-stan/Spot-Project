import React from 'react';
import { Link } from 'react-router-dom';


function LoginForm(){

    return (
        <>

            <div>

                <h2>Login</h2>
                <form action="#" method='POST'>
                    <input className="form-input" placeholder='Email' />
                    <input className="form-input" placeholder='Password' type="password" />
                    <p className='forgot-password'>Forgot Password?</p>
                    
                    <button className='submit-btn'>Log In</button>

                    <p className="register-text">Not a member? 
                    <Link to='/register' className='register-link'>Register</Link>
                    </p>
                </form>

            </div>
        </>
    )

}

function RegisterForm(){

    return (
        <>

            <div>

                <h2>Sign Up</h2>
                <form action="#" method='POST'>
                    <input className="form-input" placeholder='Full Name' />
                    <input className="form-input" placeholder='New Username' />
                    <input className="form-input" placeholder='Email' />
                    <input className="form-input" placeholder='New Password' type="password" />
                    <input className="form-input" placeholder='Confirm Password' type="password" />
                    
                    <button className='submit-btn'>Sign Up</button>

                    <p className="register-text">Already a member? 
                    <Link to='/login' className='register-link'>Log In</Link>
                    </p>
                </form>

            </div>
        </>
    )

}

export {LoginForm, RegisterForm};