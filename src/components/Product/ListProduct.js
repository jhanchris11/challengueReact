import React, { useEffect, Fragment } from 'react'
import CreateProduct from '../../components/Product/CreateProduct'
import CardProduct from '../../components/Layout/CardProduct'
import { SessionContext } from '../../context/SessionContext'
import { getListProducts } from '../../services/clientService'

const ListProduct = () => {

    const [session, setSession] = React.useContext(SessionContext)

    const getProducts = async () => {
        const dataProducts = await getListProducts(localStorage.getItem('sessionId'))
        setSession({
            ...session,
            products: dataProducts.data,

        })
    }
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   


    return (
        <Fragment>
            <CreateProduct />
            <div className='badge-card'>
                {session.products && session.products.map(product => (
                    <CardProduct key={product.id} product={product}
                    />
                ))}
            </div>
        </Fragment>
    )
}

export default ListProduct
