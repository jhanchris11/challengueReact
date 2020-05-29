import React, { useEffect } from 'react'
import { Card } from 'antd';
import logoProfile from '../../img/profile.png'
import { getUserMe, getCompanies } from '../../services/clientService'

const { Meta } = Card;

const Profile = () => {

    const [profile, setProfile] = React.useState({
        companyId: '',
        name: '',
        email: ''
    })
    const [company, setCompany] = React.useState({})

    useEffect(() => {
        const getProfile = async () => {
            const responseMe = await getUserMe()
            const response = await getCompanies()
            if (responseMe.status === 200 || response.status === 200) {
                setProfile({
                    ...responseMe.data
                })
                if (JSON.parse(localStorage.getItem('companyId')) !== null) {
                    let data = response.data.filter(company => company.id === Number(localStorage.getItem('companyId')))
                    setCompany(data[0])
                } else {
                    setCompany({ name: ' This user does not belong to a company' })
                }

            }
        }
        getProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Card
            title='My profile'
            hoverable
            cover={<img alt="example" className='logoProfile' src={logoProfile} />}
        >
            <Meta title={profile.email} description={company.name} />
        </Card>
    )
}

export default Profile
