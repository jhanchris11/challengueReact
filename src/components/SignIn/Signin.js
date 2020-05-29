import React, { useContext, Fragment } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { signIn, getUserMe } from '../../services/clientService'

import { useHistory } from 'react-router-dom'
import { SessionContext } from '../../context/SessionContext';
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 10, span: 18 },
};

const Signin = () => {

    const history = useHistory()
    const [session, setSession] = useContext(SessionContext)


    const onFinish = async values => {

        const response = await signIn(values)
        if (response.status) {
            const { sessionId } = response.data
            localStorage.setItem('sessionId', response.data.sessionId)
            setSession({
                ...session,
                sessionId,
                session: true
            })

            const responseMe = await getUserMe(sessionId)

            if (responseMe.status === 200) {
                setSession({
                    ...session,
                    user: response.data
                })

                localStorage.setItem('companyId', responseMe.data.companyId)
            }
            history.push('/companies')
        }
    }

    return (
        <Fragment>

            <Form className='form-sign'
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}

            >
                <h1 className='name-signin'>Sign In</h1>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor ingrese su email!' }]}
                >
                    <Input placeholder='email@email.com' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout} >

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </Fragment>
    )
}
export default Signin