import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getOrderByStatusCancelFailed, getOrderByStatusCancelSuccess, getOrderByStatusFailed,
  getOrderByStatusSuccess, getOrderByStoreIdFailed, getOrderByStoreIdSuccess
} from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getOrderByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getOrderByStoreIdSuccess(res.data.data));
    } else {
      yield put(getOrderByStoreIdFailed('FAILED'));
    }
  } catch (error) {
    yield put(getOrderByStoreIdFailed(error.message));
  }
}

export function* getOrderByStatusNew({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?status=NEW&storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getOrderByStatusSuccess(res.data.data));
    } else {
      yield put(getOrderByStatusFailed('FAILED'));
    }
  } catch (error) {
    yield put(getOrderByStatusFailed(error.message));
  }
}

export function* getOrderByStatusCancel({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?status=CANCEL&storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getOrderByStatusCancelSuccess(res.data.data));
    } else {
      yield put(getOrderByStatusCancelFailed('FAILED'));
    }
  } catch (error) {
    yield put(getOrderByStatusCancelFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerManagerOrderSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER_BY_STORE_ID, getOrderByStoreId);
  yield takeEvery(types.GET_ORDER_BY_STATUS_NEW, getOrderByStatusNew);
  yield takeEvery(types.GET_ORDER_BY_STATUS_CANCEL, getOrderByStatusCancel);
}
