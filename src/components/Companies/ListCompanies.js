import React, { Fragment, useEffect, useContext } from 'react'
import CreateCompany from '../../components/Companies/CreateCompany'
import { SessionContext } from '../../context/SessionContext'
import { getCompanies } from '../../services/clientService'

import CardCustomer from '../Layout/Card'

const ListCompanies = () => {

    const [session, setSession] = useContext(SessionContext)

    const getListCompanies = async () => {
        const dataCompany = await getCompanies()
        setSession({
            ...session,
            companies: dataCompany.data
        })
    }
    useEffect(() => {
        getListCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <CreateCompany />
            <div className='badge-card'>
                {session.companies && session.companies.map(company => (
                    <CardCustomer key={company.id} company={company}
                    />
                ))}
            </div>
        </Fragment>
    )
}

export default ListCompanies
