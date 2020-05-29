import React, { Fragment } from 'react'

import Signup from '../components/SignUp/Signup'
import imgSignUp from '../img/signup.png'
import HeaderMain from '../components/Layout/HeaderMain'
import FooterMain from '../components/Layout/Footer'
const SignUp = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className='bg-panel'>
                <div className='panel-main'>
                    <div className='panel-signup'>
                        <Signup />
                    </div>
                    <div className='panel-img'>
                        <img className='img-signup' src={imgSignUp} alt='sign up'></img>
                    </div>
                </div>

            </div>
            <FooterMain />
        </Fragment>
    )
}

export default SignUp
