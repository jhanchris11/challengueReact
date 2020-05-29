import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { signUp } from '../../services/clientService'
import { useHistory } from 'react-router-dom'
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 10 },
};

const Signup = () => {
    const history = useHistory()

    const onFinish = values => {

        signUp(values)
        history.push('/')
    }

    return (
        <Form className='form-sign'
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}

        >
            <h1 className='name-signup'>Sign Up</h1>
            <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}

            >
                <Input placeholder='nombre' />

            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ type: 'email', message: 'No es valido el email!' },
                { required: true, message: 'Por favor ingrese su email!' }]}
            >
                <Input placeholder='email@email.com' />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                hasFeedback
            >
                <Input.Password placeholder='password' />
            </Form.Item>
            <Form.Item
                name='passwordConfirmation'
                label='Confirm'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Por favor confirme su password'
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Las dos contraseñas que ingresaste no coinciden!')
                        }
                    })
                ]}
            >
                <Input.Password placeholder='repeat password' />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout} >

                <Button type="primary" htmlType="submit">
                    To Access
                </Button>

            </Form.Item>
        </Form>
    )
}

export default Signup
