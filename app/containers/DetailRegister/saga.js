import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { approvedStoreFailed, approvedStoreSuccess, declinedStoreFailed, declinedStoreSuccess, getRegisterByIdFailed, getRegisterByIdSuccess } from './actions';
import { apiChangeStatus, apiFetchData } from './api';
import * as types from './constants';

export function* approvedStore({ payload }) {
  try {
    const res = yield call(apiChangeStatus, [`api/store/${payload.id}/status/approved`], payload.body);
    if (res.status == 200) {
      yield put(approvedStoreSuccess("Success"))
    } else {
      yield put(approvedStoreFailed("Error"))
    }
  } catch (error) {
    yield put(approvedStoreFailed(error.message));
  }
}

export function* declinedStore({ payload }) {
  try {
    const res = yield call(apiChangeStatus, [`api/store/${payload.id}/status/declined`], payload.body);
    if (res.status == 200) {
      yield put(declinedStoreSuccess("Success"))
    } else {
      yield put(declinedStoreFailed("Error"))
    }
  } catch (error) {
    yield put(declinedStoreFailed(error.message));
  }
}

export function* getRegisterById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/detail?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getRegisterByIdSuccess(res.data));
    } else {
      yield put(getRegisterByIdFailed("Failed"));
    }
  } catch (error) {
    yield put(getRegisterByIdFailed(error.message));
  }
}

// Individual exports for testing
export default function* detailRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.APPROVED_STORE, approvedStore);
  yield takeEvery(types.DECLINED_STORE, declinedStore);
  yield takeEvery(types.GET_REGISTER_BY_ID, getRegisterById);
}
