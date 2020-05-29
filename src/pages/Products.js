import React, { Fragment } from 'react'
import Breadcrumb from '../components/Layout/Content'
import { Layout } from 'antd'
import ListProduct from '../components/Product/ListProduct'
import FooterMain from '../components/Layout/Footer'
const { Content } = Layout

const Products = () => {

    return (
        <Fragment>
            <Content className='cl-content'>
                <Breadcrumb />
                <div className="cl-content-bg">
                    <ListProduct />

                </div>
            </Content>
            <FooterMain />
        </Fragment>
    )
}

export default Products
