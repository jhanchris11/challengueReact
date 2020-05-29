import React, { Fragment, useEffect } from 'react'

import { Table, Input, Space, Button, Modal, Form } from 'antd';
import { getCompanyUsers, getUserMe, updateUserDetails } from '../../services/clientService'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ListCompanyUsers = () => {

    const { Column } = Table;
    const [profile, setProfile] = React.useState({
        name: '',
        email: ''
    })
    const [users, setUser] = React.useState([])

    const [loading, setLoading] = React.useState(false)
    const [visible, setVisible] = React.useState(false)


    const showModal = () => {
        setVisible(true)
    };

    const onFinish = async (value) => {

        await updateUserDetails(value)
        const response = await getCompanyUsers()
        setUser(response.data)

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setVisible(false)
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false)
    };

    useEffect(() => {
        const getUserOfCompaniesAndMe = async () => {
            const response = await getCompanyUsers()
            const responseMe = await getUserMe()


            if (response.status === 200 || responseMe.status === 200) {
                const data = response.data

                setUser(data)
                setProfile({
                    ...responseMe.data
                })

            }
        }
        getUserOfCompaniesAndMe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

 
    return (
        <Fragment>
            <h1 style={{ textAlign: "center" }}>List Company Users</h1>
            <br></br>
            <Table dataSource={users}>

                <Column title="UserId" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />

                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Button onClick={showModal}>Edit</Button>
                            <Modal
                                title="Title"
                                visible={visible}
                                onOk={onFinish}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Return
                                 </Button>,
                                    <Button key="submit" type="primary" loading={loading} onClick={onFinish}>
                                        Edit
                                </Button>,
                                ]}
                            >
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ id: profile.id, companyId: profile.companyId, name: profile.name, email: profile.email }}
                                    onFinish={onFinish}
                               
                                >
                                    <Form.Item
                                        label="User"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your user!' }]}
                                    >
                                        <Input placeholder='Name of the User' name='name' />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your sku!' }]}
                                    >
                                        <Input placeholder='email' name='email' />
                                    </Form.Item>

                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit" loading={loading} >
                                            Submit
                                </Button>

                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Space>
                    )}
                />
            </Table>
        </Fragment>
    )

}

export default ListCompanyUsers
