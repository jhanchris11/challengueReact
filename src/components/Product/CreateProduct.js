import React, { Fragment } from 'react'
import { Button } from 'antd'
import UpdateProduct from './UpdateProduct'

const CreateProduct = () => {

    const [visible, setVisible] = React.useState(false)

    const showModal = () => {
        setVisible(true)
    };
    const handleCancel = () => {
        setVisible(false)
    };

    return (
        <Fragment>
            <div className='badge-product'>
              
                    <h1 className='name-product'>Welcome, you can create products !!!</h1>
                    <h1>Create Products !!! </h1>
             
                <div>
                    <Button type="primary" onClick={showModal}>
                        New Product
                    </Button>
                </div>
            </div>
            <UpdateProduct visible={visible} parentCallbackShow={showModal} parentCallbackCancel={handleCancel} edit={false} values={{ name: '', sku: '', price: 0, discount: 0 }} />
            <br />
            {/* <Empty /> */}

        </Fragment>
    )
}

export default CreateProduct
