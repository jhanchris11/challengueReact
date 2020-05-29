
import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000'
})
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `${localStorage.getItem('sessionId')}`
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient

