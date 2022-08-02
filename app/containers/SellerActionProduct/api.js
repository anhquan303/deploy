import apiBase from '../../utils/baseAPI';
import apiBase1 from '../../utils/baseAPI2';

export const apiUpdateProduct = (data, payload) => {
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

export const uploadImage = (data, payload) => {
    return new Promise((resolve, reject) => {
        return apiBase1
            .post(`${data[0]}`, payload)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}