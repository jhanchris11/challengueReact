import React, { useState } from 'react'
import { Layout, Menu } from 'antd'

import {
    ProjectOutlined,
    UserAddOutlined,
    ImportOutlined,
    LockOutlined,
    FileProtectOutlined,

} from '@ant-design/icons'
import { SessionContext } from '../../context/SessionContext'

import { Link } from 'react-router-dom'
import { logout } from '../../services/clientService'

const { Sider } = Layout

const Aside = () => {

    const [collapsed, setCollapsed] = useState(false)
    const [session] = React.useContext(SessionContext)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    const handleLogout = async () => {
        await logout()
    }
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className='logo' />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1" icon={<ProjectOutlined />}>
                    <Link to='/companies' >Companies</Link>
                </Menu.Item>
                {session.companyId !== null && <Menu.Item key="2" icon={<FileProtectOutlined />}>
                    <Link to='/products'>Products</Link>
                </Menu.Item>}

                <Menu.Item key="3" icon={<UserAddOutlined />}>
                    <Link to='/users'>Profile</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<LockOutlined />}>
                    <Link to='/reset'>Reset</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<ImportOutlined />} onClick={handleLogout}>
                    <Link to='/'>Logout</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Aside
