import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getAllStoreFailed, getAllStoreSuccess, getAllUserFailed, getAllUserSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';




export function* getAllStore({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/store/getallstore']);
    if (res.status == 200) {
      yield put(getAllStoreSuccess(res.data));
    } else {
      yield put(getAllStoreFailed("error"));
    }
  } catch (error) {
    yield put(getAllStoreFailed(error.message));
  }
}

export function* getAllUser({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/user/allUser']);
    if (res.status == 200) {
      yield put(getAllUserSuccess(res.data.data));
    } else {
      yield put(getAllUserFailed("error"));
    }
  } catch (error) {
    yield put(getAllUserFailed(error.message));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ALL_STORE, getAllStore);
  yield takeEvery(types.GET_ALL_USER, getAllUser);
}




