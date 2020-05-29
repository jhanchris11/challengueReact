import React from 'react'
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { changePassword } from '../../services/clientService'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ChangePassword = () => {
    const history = useHistory()

    const onFinish = async values => {

        await changePassword(values)
        history.push('/companies')

    };


    return (
        <Form
            className='form-reset'
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}

        >
            <h1 className='name-reset '>Reset Password</h1>
            <Form.Item
                label="Password"
                name="oldPassword"
                rules={[{ required: true, message: 'Por favor ingrese su contraseña antiguo!' }]}
            >
                <Input.Password placeholder='old password' />
            </Form.Item>

            <Form.Item
                label="Password"
                name="newPassword"
                rules={[{ required: true, message: 'Por favor ingrese su contraseña nueva!' }]}
                hasFeedback
            >
                <Input.Password placeholder='new password' />
            </Form.Item>
            <Form.Item
                label='Confirm'
                name='newPasswordConfirmation'
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Por favor confirme su password'
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Las dos contraseñas que ingresaste no coinciden!')
                        }
                    })
                ]}
            >
                <Input.Password placeholder='repeat new password' />
            </Form.Item>

            <Form.Item {...tailLayout} >
                <Button type="primary" htmlType="submit">
                    Change Now
                        </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangePassword
