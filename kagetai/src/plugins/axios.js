import axios from 'axios'
import backendIP from '../../backendIP';
const instance = axios.create({
    baseURL: 'http://'+backendIP+':3000',
})

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance
