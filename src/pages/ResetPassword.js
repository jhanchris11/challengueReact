import React, { Fragment } from 'react'
import ChangePassword from '../components/ChangePassword/ChangePassword'
import forgot from '../img/forgot.png'
import HeaderMain from '../components/Layout/HeaderMain'
import FooterMain from '../components/Layout/Footer'
const ResetPassword = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className='bg-panel'>
                <div className='panel-main'>
                    <div className='panel-reset'>
                        <ChangePassword />
                    </div>
                    <div className='panel-img'>
                        <img className='img-forgot' src={forgot} alt='forgot'></img>
                    </div>
                </div>
            </div>
            <FooterMain />
        </Fragment>


    )
}

export default ResetPassword
