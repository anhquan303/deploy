import axios from "axios";
//const baseApiUrl = 'http://localhost:3990/';
//const baseApiUrl = 'http://Ofoapp-env.eba-rsgvdcbq.us-east-1.elasticbeanstalk.com/';
const baseApiUrl = 'https://ofo-backend-project.herokuapp.com/';

const baseInstance = axios.create({
  baseURL: baseApiUrl,
});

baseInstance.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      localStorage.setItem("authtoken", response.headers.authorization);
    }
    return response;
  },
  (error) => {
    //  message = error.message;
    // if (error.response.data && error.response.data.errors) {
    //   message = error.response.data.errors;
    // } else if (error.response.data && error.response.data.error) {
    //   message = error.response.data.error;
    // }
    return Promise.reject(error);
  }
);

export default baseInstance;