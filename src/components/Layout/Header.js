import React, { useEffect } from 'react'
import { Layout, Avatar, Typography } from 'antd'
import user from '../../img/avatar1.png'
import { getUserMe } from '../../services/clientService'
const { Title } = Typography;
const { Header } = Layout

const HeaderSecundario = () => {
    const [username, setUserName] = React.useState('')

    useEffect(() => {
        const getProfile = async () => {
            const responseMe = await getUserMe()
            if (responseMe.status === 200) {
                const { name } = responseMe.data
                setUserName(name)
            }
        }
        getProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Header className='cl-header'>
            <Title level={3} className='cl-header-title'>Welcome <span className='name-user'>{username}</span></Title>
            <Avatar className='img-cl' size='64' src={user} alt='user'></Avatar>
        </Header>
    )
}

export default HeaderSecundario
