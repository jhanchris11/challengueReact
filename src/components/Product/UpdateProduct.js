import React from 'react'
import { Modal, Button, Input, Form } from 'antd'
import { SessionContext } from '../../context/SessionContext'
import { updateProduct, createProduct, getListProducts } from '../../services/clientService';
import { useHistory } from 'react-router-dom'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const UpdateProduct = ({ visible, parentCallbackShow, parentCallbackCancel, edit, values }) => {

    const [loading, setLoading] = React.useState(false)
    const [session, setSession] = React.useContext(SessionContext)
    const [form] = Form.useForm();
    const [product, setProduct] = React.useState({
        companyId: localStorage.getItem('companyId'),
        name: '',
        sku: '',
        price: 0,
        discount: 0
    })
    const history = useHistory()
    const handlerVisible = () => {
        parentCallbackShow()

    }

    const handlerProduct = e => {
        e.preventDefault()
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })

    }

    const onReset = () => {
        form.resetFields();
    }
    const onFinish = () => {

        setLoading(true)

        setTimeout(async () => {
            setLoading(false)
            handlerVisible(false)

            try {

                if (edit === true) {
                    const response = await updateProduct(product, values.id)
                    if (response.status === 200) {
                        const dataProducts = await getListProducts()
                        setSession({
                            ...session,
                            products: dataProducts.data
                        })
                        history.push('/products')
                    }
                }
                else {
                    const response = await createProduct(product)

                    if (response.status === 200) {
                        localStorage.setItem('productId', response.data.id)
                        const dataProducts = await getListProducts()
                        setSession({
                            ...session,
                            products: dataProducts.data,
                        })
                        history.push('/products')
                    }
                }

                handleCancel()
                onReset()

            } catch (error) {
                throw error
            }
        }, 2000);
    };

    const handleCancel = () => {
        parentCallbackCancel()
    }
 
    return (
        <Modal
            visible={visible}
            title={edit === true ? "Edit Product" : "New Product"}

            onOk={onFinish}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
            </Button>
            ]}
        >
            <Form
                {...layout}
                name="basic"
                initialValues={{ id: values.id, name: values.name, sku: values.sku, price: values.price, discount: values.discount }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label="Product"
                    name="name"
                    rules={[{ required: true, message: 'Please input your product!' }]}
                >
                    <Input placeholder='Name of the Product' name='name' onChange={handlerProduct} />
                </Form.Item>

                <Form.Item
                    label="Sku"
                    name="sku"
                    rules={[{ required: true, message: 'Please input your sku!' }]}
                >
                    <Input placeholder='Sku' name='sku' onChange={handlerProduct} />
                </Form.Item>
                <Form.Item
                    label='Price'
                    name='price'
                    rules={[{ required: false, message: 'Please input your price!' }]}
                >
                    <Input
                        type="number"
                        style={{ width: 100 }}
                        name='price'
                        onChange={handlerProduct}
                    />

                </Form.Item>
                <Form.Item
                    label='Discount'
                    name='discount'
                    rules={[{ required: false, message: 'Please input your Discount!' }]}
                >
                    <Input
                        type="number"
                        name='discount'
                        onChange={handlerProduct}
                        style={{ width: 100 }}
                    />

                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading} >
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateProduct
