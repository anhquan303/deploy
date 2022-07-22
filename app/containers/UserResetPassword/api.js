import apiBase from '../../utils/baseAPI';

export const apiPost = (data, payload) =>
  new Promise((resolve, reject) =>
    apiBase
      .post(`${data[0]}`, payload)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );
