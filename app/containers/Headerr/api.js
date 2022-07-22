import apiBase from '../../utils/baseAPI';

export const apiSignup = (data, payload) =>
  new Promise((resolve, reject) =>
    apiBase
      .post(`${data[0]}`, payload)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

export const apiFetchData = data =>
  new Promise((resolve, reject) =>
    apiBase
      .get(`${data[0]}`, data[1])
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );
