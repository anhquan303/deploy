import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { approvedStoreFailed, approvedStoreSuccess, declinedStoreFailed, declinedStoreSuccess, getOrderByStoreIdFailed, getOrderByStoreIdSuccess, getStoreByIdFailed, getStoreByIdSuccess } from './actions';
import { apiChangeStatus, apiFetchData } from './api';
import * as types from './constants';


export function* declineStore({ payload }) {
  try {
    const res = yield call(apiChangeStatus, [`api/store/${payload.id}/status/declined`]);
    if (res.status == 200) {
      yield put(declinedStoreSuccess("DECLINED SUCCESS"));
    } else {
      yield put(declinedStoreFailed("DECLINED FAILED"));
    }
  } catch (error) {
    yield put(declinedStoreFailed(error.message));
  }
}

export function* approveStore({ payload }) {
  try {
    const res = yield call(apiChangeStatus, [`api/store/${payload.id}/status/approved`]);
    if (res.status == 200) {
      yield put(approvedStoreSuccess("APPROVED SUCCESS"));
    } else {
      yield put(approvedStoreFailed("APPROVED FAILED"));
    }
  } catch (error) {
    yield put(approvedStoreFailed(error.message));
  }
}

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

export function* getOrderByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getOrderByStoreIdSuccess(res.data.data));
    } else {
      yield put(getOrderByStoreIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getOrderByStoreIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* detailStoreSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.DECLINED_STORE, declineStore);
  yield takeEvery(types.GET_STORE_BY_ID, getStoreById);
  yield takeEvery(types.APPROVED_STORE, approveStore);
  yield takeEvery(types.GET_ORDER_BY_STORE_ID, getOrderByStoreId);
}
