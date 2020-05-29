import React, { Fragment } from 'react'
import { Button } from 'antd'

import UpdateCompanies from './UpdateCompanies'
const CreateCompanies = () => {

    const [visible, setVisible] = React.useState(false)

    const showModal = () => {
        setVisible(true)
    };

    const handleCancel = () => {
        setVisible(false)
    };
    return (
        <Fragment>
            <div className='badge-company'>


                <h1>Choose the Company !!! </h1>

                <div>
                    <Button type="primary" onClick={showModal}>
                        New Company
                     </Button>
                </div>

            </div>
            <UpdateCompanies visible={visible} parentCallbackShow={showModal} parentCallbackCancel={handleCancel} edit={false} values={{ name: '', ruc: '', website: '' }} />

        </Fragment>
    )
}

export default CreateCompanies
