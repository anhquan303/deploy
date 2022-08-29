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
        config.headers['x-client-id'] = ' e46173f3-6f7b-413f-ad2e-d08c3c67b057';
        config.headers['x-api-key'] = '16cf7f6f-2bf3-4b0d-a798-87b87a915669';
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
