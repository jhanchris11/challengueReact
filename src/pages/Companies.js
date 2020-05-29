import React, { Fragment } from 'react'
// import CreateCompany from '../components/Companies/CreateCompany'
import { Layout } from 'antd'

import Breadcrumb from '../components/Layout/Content'
import ListCompanies from '../components/Companies/ListCompanies'
import FooterMain from '../components/Layout/Footer'
const { Content } = Layout
const Companies = () => {
    return (
        <Fragment>
            <Content className='cl-content'>
                <Breadcrumb />
                <div className="cl-content-bg">
                    <ListCompanies />
                </div>
            </Content>
            <FooterMain />
        </Fragment>


    )
}

export default Companies
