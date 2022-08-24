import axios from 'axios';
const baseApiUrl = 'https://api.vietqr.io/v2/lookup';
//const baseApiUrl = 'https://ofo-backend-project.herokuapp.com/';
// const baseApiUrl = 'https://reqres.in//';

const baseInstance = axios.create({
    baseURL: baseApiUrl,
});

baseInstance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['x-client-id'] = '7dbd8f18-019c-4716-b588-2b10211601db';
        config.headers['x-api-key'] = 'e8711bb8-4117-40ba-a7a8-9da3e8d71516';
        return config;
    },
    error => Promise.reject(error),
);

baseInstance.interceptors.response.use(
    response => {
        if (response.headers.authorization) {
            localStorage.setItem('authtoken', response.headers.authorization);
        }
        return response;
    },
    error =>
        //  message = error.message;
        // if (error.response.data && error.response.data.errors) {
        //   message = error.response.data.errors;
        // } else if (error.response.data && error.response.data.error) {
        //   message = error.response.data.error;
        // }
        Promise.reject(error),
);

export default baseInstance;
