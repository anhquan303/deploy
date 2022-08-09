import apiBase from '../../utils/baseAPI';
import apiBase1 from '../../utils/baseAPI2';

export const apiFetchData = data =>
  new Promise((resolve, reject) =>
    apiBase
      .get(`${data[0]}`, data[1])
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

export const apiPost = (data, payload) =>
  new Promise((resolve, reject) =>
    apiBase
      .post(`${data[0]}`, payload)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

export const uploadImage = (data, payload) => {
  return new Promise((resolve, reject) => {
    return apiBase1
      .post(`${data[0]}`, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}