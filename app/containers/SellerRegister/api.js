import apiBase from '../../utils/baseAPI';
import apiBase1 from '../../utils/baseAPI2';
import axios from "axios";

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
        return axios
            .get("https://provinces.open-api.vn/api/d/276?depth=2")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

export const apiGetListBank = (data) => {
    return new Promise((resolve, reject) => {
        return axios
            .get("https://api.vietqr.io/v2/banks")
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