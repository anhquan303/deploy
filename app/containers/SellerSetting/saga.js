import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getListWardsFailed, getListWardsSuccess, getStoreByIdFailed, getStoreByIdSuccess } from './actions';
import { apiFetchData, apiGetListWards } from './api';
import * as types from './constants';

export function* getStoreById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/detail?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getStoreByIdSuccess(res.data));
    } else {
      yield put(getStoreByIdFailed("FAILED"));
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
      yield put(getListWardsFailed("FAILED"));
    }
  } catch (error) {
    yield put(getListWardsFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerSettingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_STORE_BY_ID, getStoreById);
  yield takeEvery(types.GET_LIST_WARDS, getListWards);
}
