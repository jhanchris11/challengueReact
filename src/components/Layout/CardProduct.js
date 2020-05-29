import React, { Fragment } from 'react'
import { Card, Avatar, Col, Button } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router-dom'
import logoProduct from '../../img/products.png'
import UpdateProduct from '../Product/UpdateProduct';
import { deleteProduct, getListProducts } from '../../services/clientService';
import { SessionContext } from '../../context/SessionContext'
const { Meta } = Card
const CardProduct = ({ product, parentCallback }) => {
    const [session, setSession] = React.useContext(SessionContext)
    const [visible, setVisible] = React.useState(false)

    const history = useHistory()

    const showModal = () => {
        setVisible(true)

    };
    const handleCancel = () => {
        setVisible(false)
    };

    const handlerDelete = async () => {

        const resolve = await deleteProduct(product.id)
        if (resolve.status === 200) {
            if (resolve) {
                localStorage.removeItem('productId')
                const dataProducts = await getListProducts()

                setSession({
                    ...session,
                    products: dataProducts.data
                })
                history.push('/products')

            }
        }

    }
    const handlerEdit = () => {
        showModal()
    }

    return (
        <Fragment>
            <Col span='8' className='col-card'>
                <Card
                    cover={
                        <img
                            className='logoCompany'
                            alt="example"
                            src={logoProduct}
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta

                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={product.name}
                        description={product.sku}
                    />

                    <Button type='submit' onClick={handlerEdit}>Editar</Button>
                    <Button type='submit' onClick={handlerDelete}>Delete</Button>

                </Card>

            </Col>
            <UpdateProduct visible={visible} parentCallbackShow={showModal} parentCallbackCancel={handleCancel} edit={true} values={product} />
        </Fragment>

    )
}

export default CardProduct
