import React from 'react'
import { Layout, Menu } from 'antd'
import Logo from '../../img/peru-legal.png'
import { Link } from 'react-router-dom'
import { SessionContext } from '../../context/SessionContext'
const { Header } = Layout
const HeaderMain = () => {

    const [session] = React.useContext(SessionContext)
    // const handlerDisabled = () => {
    //     return
    // }
    return (
        <Header className='badge-header'>
            <img className='img-logo' src={Logo} alt='user'></img>
            <Menu theme='light' mode='horizontal' defaultOpenKeys={['1']}>

                {session.companyId === null ? <Menu.Item disabled key="1"><Link to='/companies'>Companies</Link> </Menu.Item> : <Menu.Item key="1"><Link to='/companies'>Companies</Link> </Menu.Item>}
                {session.companyId === null ? <Menu.Item disabled key="2"><Link to='/products'>Products</Link> </Menu.Item> : <Menu.Item key="2"><Link to='/products'>Products</Link> </Menu.Item>}

                <Menu.Item key="3"><Link to='/'>Login</Link></Menu.Item>
                <Menu.Item key="4"><Link to='/signup'>Registered</Link></Menu.Item>
            </Menu>
        </Header>
    )
}

export default HeaderMain
