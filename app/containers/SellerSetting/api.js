import axios from 'axios';
import apiBase from '../../utils/baseAPI';

export const apiFetchData = data =>
  new Promise((resolve, reject) =>
    apiBase
      .get(`${data[0]}`, data[1])
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

export const apiGetListWards = data =>
  new Promise((resolve, reject) =>
    axios
      .get('https://provinces.open-api.vn/api/d/276?depth=2')
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