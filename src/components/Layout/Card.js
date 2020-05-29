import React, { Fragment } from 'react'
import { Card, Avatar, Col, Button } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import logoCompany from '../../img/company.png'
import { leaveCompany, getUserMe, joinCompany } from '../../services/clientService';
import { useHistory } from 'react-router-dom'
import UpdateCompanies from '../Companies/UpdateCompanies'
import { SessionContext } from '../../context/SessionContext'
import { getListProducts } from '../../services/clientService'
const { Meta } = Card
const CardCustomer = ({ company }) => {

    const [visible, setVisible] = React.useState(false)
    const [session, setSession] = React.useContext(SessionContext)
    const history = useHistory()

    const showModal = () => {
        setVisible(true)
    };
    const handleCancel = () => {
        setVisible(false)
    };
    const handlerLeave = () => {
        leaveCompany(session.sessionId).then(resolve => {
            if (resolve) {

                getUserMe(session.sessionId).then(resolve => {
                    const { companyId } = resolve.data
                    localStorage.setItem('companyId', companyId)
                    setSession({
                        ...session,
                        companyId: companyId
                    })
                    history.push('/companies')
                })
            }
        })
    }
    const handlerEnter = () => {
        if (JSON.parse(localStorage.getItem('companyId')) !== null) {
            return
        }
        joinCompany({ companyId: company.id }).then(resolve => {
            if (resolve) {
                const { id } = resolve.data
                setSession({
                    ...session,
                    companyId: id,
                    company: resolve.data
                })
                localStorage.setItem('companyId', id)
                history.push('/companies')
            }
        })
    }
    const handlerProducts = async () => {
        const dataProducts = await getListProducts(localStorage.getItem('sessionId'))
        setSession({
            ...session,
            products: dataProducts.data,
        })
        history.push('/products')
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
                            src={logoCompany}
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
                        title={company.name}
                        description={company.ruc}

                    />
                    {Number(localStorage.getItem('companyId')) === company.id ?
                        [<Button type='submit' onClick={handlerEdit}>Editar</Button>,
                        <Button type='submit' onClick={handlerLeave}>Salir</Button>,
                        <Button type='submit' onClick={handlerProducts}>Nuestros Productos</Button>
                        ] : <Button type='submit' onClick={handlerEnter} >Entrar</Button>}
                </Card>
            </Col>
            <UpdateCompanies visible={visible} parentCallbackShow={showModal} parentCallbackCancel={handleCancel} edit={true} values={company} />

        </Fragment>


    )
}

export default CardCustomer
