import apiBase from '../../utils/baseAPI';

export const apiSignup = (data, payload) => {
    return new Promise((resolve, reject) => {
        return apiBase
            .post(`${data[0]}`, payload)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

export const apiFetchData = (data) => {
    return new Promise((resolve, reject) => {
        return apiBase
            .get(`${data[0]}`, data[1])
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}