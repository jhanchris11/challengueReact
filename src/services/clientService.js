import axiosClient from '../config/axios'


export const signUp = async (newUser) => {
    return await axiosClient.post('/auth/signup', newUser)
}

export const signIn = async (user) => {
    return await axiosClient.post('/auth/login', user)
}
export const logout = async () => {
    return await axiosClient.delete('/auth/logout')
}

export const getCompanies = async () => {
    return await axiosClient.get('/companies')
}
export const createCompany = (companie) => {
    return axiosClient.post('/companies/create_join', companie)
}
export const joinCompany = async (data) => {
    return await axiosClient.post('/companies/join', data)
}
export const updateCompany = async (company, id) => {
    delete company['website']
    return await axiosClient.put(`/companies/${id}`, company)
}
export const leaveCompany = async () => {
    return await axiosClient.post('/companies/leave', {})
}
export const getListProducts = async () => {
    return await axiosClient.get('/products')
}
export const createProduct = async (product) => {
    return await axiosClient.post('/products', product)
}
export const updateProduct = async (product, id) => {
    return await axiosClient.put(`/products/${id}`, product)
}
export const deleteProduct = async (id) => {
    return await axiosClient.delete(`/products/${id}`)
}
export const getCompanyUsers = async () => {
    return await axiosClient.get('/users')
}
export const getUserMe = async () => {
    return await axiosClient.get('/users/me')
}
export const updateUserDetails = async (newUser) => {
    return await axiosClient.put('/users/me', newUser)
}
export const changePassword = async (newPassword) => {
    return await axiosClient.put('/users/me/change_password', newPassword)
}

