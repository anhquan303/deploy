import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getListWardsFailed,
  getListWardsSuccess,
  getStoreByIdFailed,
  getStoreByIdSuccess,
  updateStoreFailed,
  updateStoreSuccess,
} from './actions';
import { apiFetchData, apiGetListWards, apiPost } from './api';
import * as types from './constants';

export function* getStoreById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/detail?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getStoreByIdSuccess(res.data));
    } else {
      yield put(getStoreByIdFailed('FAILED'));
    }
  } catch (error) {
    yield put(getStoreByIdFailed(error.message));
  }
}

export function* getListWards({ payload }) {
  try {
    const res = yield call(apiGetListWards, []);
    if (res.status == 200) {
      yield put(getListWardsSuccess(res.data.wards));
    } else {
      yield put(getListWardsFailed('FAILED'));
    }
  } catch (error) {
    yield put(getListWardsFailed(error.message));
  }
}

export function* updateStore({ payload }) {
  try {
    console.log(payload.location)
    const formData = new FormData();
    if (payload.avatar == null) {
      formData.append('name', payload.name);
      formData.append('owner_name', payload.owner_name);
      formData.append('phone', payload.phone);
      formData.append('isInCampus', payload.isInCampus);
      formData.append('email', payload.email);
      formData.append('open_time', payload.open_time);
      formData.append('close_time', payload.close_time);
      formData.append('slogan', payload.slogan);
      formData.append('description', payload.description);
      formData.append('location', payload.location);
    } else {
      formData.append('name', payload.name);
      formData.append('owner_name', payload.owner_name);
      formData.append('phone', payload.phone);
      formData.append('isInCampus', payload.isInCampus);
      formData.append('email', payload.email);
      formData.append('open_time', payload.open_time);
      formData.append('close_time', payload.close_time);
      formData.append('slogan', payload.slogan);
      formData.append('description', payload.description);
      //formData.append('cover_image', payload.cover_image);
      formData.append('avatar', payload.avatar);
      formData.append('location', payload.location);
    }
    const res = yield call(apiPost, [`api/store/${payload.id}/update`], formData);
    console.log(res)
    if (res.status == 200) {
      yield put(updateStoreSuccess('cập nhật thành công'));
    } else {
      yield put(updateStoreFailed('cập nhật thất bại'));
    }
  } catch (error) {
    yield put(updateStoreFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerSettingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_STORE_BY_ID, getStoreById);
  yield takeEvery(types.GET_LIST_WARDS, getListWards);
  yield takeEvery(types.UPDATE_STORE, updateStore);
}
