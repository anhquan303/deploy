import apiBase from '../../utils/baseAPI';

export const apiChangePass = (data, payload) => {
    return new Promise((resolve, reject) => {
        return apiBase
            .post(`${data[0]}`, payload)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}