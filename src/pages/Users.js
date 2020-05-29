import React, { Fragment } from 'react'
import Breadcrumb from '../components/Layout/Content'
import { Layout } from 'antd'
import ListCompanyUsers from '../components/Users/ListCompanyUsers'
import Profile from '../components/Users/Profile'
import FooterMain from '../components/Layout/Footer'
const { Content } = Layout

const Users = () => {
    return (
        <Fragment>
            <Content className='cl-content'>
                <Breadcrumb />
                <div className="cl-content-bg">
                    <div className='content-profile'>
                        <Profile />
                    </div>
                    <ListCompanyUsers />

                </div>
            </Content>
            <FooterMain />
        </Fragment>
    )
}

export default Users