import React from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { SessionContext } from '../../context/SessionContext'
import { useHistory } from 'react-router-dom'
import { updateCompany, getCompanies, createCompany } from '../../services/clientService'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const UpdateCompanies = ({ visible, parentCallbackShow, parentCallbackCancel, edit, values }) => {
    const [loading, setLoading] = React.useState(false)
    const [session, setSession] = React.useContext(SessionContext)

    const history = useHistory()


    const { Option } = Select;

    const handleCancel = () => {
        parentCallbackCancel()
        history.push('/companies')
    }
    const handlerVisible = () => {
        parentCallbackShow()
    }

    const onFinish = company => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            handlerVisible(false)
            try {
                if (edit === true) {
                    const response = await updateCompany(company, values.id)
                    if (response.status === 200) {
                        const dataCompanies = await getCompanies()
                        setSession({
                            ...session,
                            companies: dataCompanies.data
                        })
                        history.push('/companies')
                    }
                }

                else {
                    await createCompany(company)
                    const responseCompany = await getCompanies()
                    setSession({
                        ...session,
                        company,
                        companies: responseCompany.data
                    })

                }

                handleCancel()
            } catch (error) {
                throw new error('Err')
            }
        }, 2000);
    };

    const selectBefore = (
        <Select defaultValue="http://" className="select-before">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );
    const selectAfter = (
        <Select defaultValue=".com" className="select-after">
            <Option value=".com">.com</Option>
            <Option value=".jp">.jp</Option>
            <Option value=".cn">.cn</Option>
            <Option value=".org">.org</Option>
        </Select>
    );

    return (
        <Modal
            visible={visible}
            title={edit === true ? "Edit Company" : "New Company"}

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
                initialValues={{ id: values.id, name: values.name, ruc: values.ruc, website: values.website }}
                onFinish={onFinish}

            >
                <Form.Item
                    label="Company"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Name of the Company' />
                </Form.Item>

                <Form.Item
                    label="Ruc"
                    name="ruc"
                    rules={[{ required: true, message: 'Please input your ruc!' }]}
                >
                    <Input placeholder='Ruc' />
                </Form.Item>
                {edit === false && <Form.Item
                    label='WebSite'
                    name='website'
                    rules={[{ required: false, message: 'Please input your website!' }]}
                >
                    <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
                </Form.Item>}

                <Form.Item {...tailLayout}>
                    {edit === true ? <Button type="primary" htmlType="submit" loading={loading} >
                        Edit
                 </Button> : <Button type="primary" htmlType="submit" loading={loading} >
                            Submit
                 </Button>}


                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateCompanies
