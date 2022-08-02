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
        config.headers['x-client-id'] = '94fd6cb2-2dd9-47b6-9089-3f5952dfe406';
        config.headers['x-api-key'] = '602b3efe-f829-48c0-982f-f307b62bb10d';
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
