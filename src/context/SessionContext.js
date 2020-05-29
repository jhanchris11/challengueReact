import React from 'react'

const SessionContext = React.createContext([{}, () => { }]);

const SessionProvider = (props) => {
    const getCompanyId = () => {

        if (JSON.parse(localStorage.getItem('companyId')) !== null) {
            return Number(localStorage.getItem('companyId'))
        }
        return null
    }
    const [session, setSession] = React.useState({
        sessionId: '',
        session: false,
        company: '',
        companies: [],
        user: '',
        product: '',
        companyId: getCompanyId(),
        products: [],

    })


    return (
        <SessionContext.Provider value={[session, setSession]}>
            {props.children}
        </SessionContext.Provider>
    )
}

export { SessionContext, SessionProvider }
