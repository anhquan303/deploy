import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getUserByIdFailed,
  getUserByIdSuccess,
  updateUserFailed,
  updateUserSuccess,
} from './actions';
import { apiFetchData, apiSignup, uploadImage } from './api';
import * as types from './constants';

export function* updateUser({ payload }) {
  try {
    const formData = new FormData();
    if (payload.avatarFile != null) {
      formData.append('firstname', payload.firstname);
      formData.append('lastname', payload.lastname);
      formData.append('gender', payload.gender);
      formData.append('dateOfBirth', payload.dateOfBirth);
      formData.append('avatarFile', payload.avatarFile);
    } else {
      formData.append('firstname', payload.firstname);
      formData.append('lastname', payload.lastname);
      formData.append('gender', payload.gender);
      formData.append('dateOfBirth', payload.dateOfBirth);
    }
    const res = yield call(uploadImage, ['api/user/update'], formData);
    if (res.status == 200) {
      yield put(updateUserSuccess('UPDATE SUCCESS'));
    } else {
      yield put(updateUserFailed('UPDATE FAILED'));
    }
  } catch (error) {
    yield put(updateUserFailed(error.message));
  }
}

export function* getUserById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/user/getById?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getUserByIdSuccess(res.data.data));
    } else {
      yield put(getUserByIdFailed('Failed'));
    }
  } catch (error) {
    yield put(getUserByIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* userSettingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.UPDATE_USER, updateUser);
  yield takeEvery(types.GET_USER_BY_ID, getUserById);
}
