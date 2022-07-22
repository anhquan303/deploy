import apiBase from '../../utils/baseAPI';

export const apiFetchData = data =>
  new Promise((resolve, reject) =>
    apiBase
      .get(`${data[0]}`, data[1])
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );
