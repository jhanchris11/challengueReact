import React, { Fragment } from 'react'
import SignIn from '../components/SignIn/Signin'
import imgSignIn from '../img/signin.png'
import HeaderMain from '../components/Layout/HeaderMain'
import FooterMain from '../components/Layout/Footer'

const Home = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className='bg-panel'>
                <div className='panel-main'>
                    <div className='panel-signin'>

                        <SignIn />
                    </div>
                    <div className='panel-img'>
                        <img className='img-signin' src={imgSignIn} alt='sign in'></img>
                    </div>
                </div>
            </div>
            <FooterMain />
        </Fragment>
    )
}

export default Home
