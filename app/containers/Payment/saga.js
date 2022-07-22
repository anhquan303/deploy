import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { createOrderFailed, createOrderSuccess, getListLocationByUserIdFailed, getListLocationByUserIdSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* createOrder({ payload }) {
  try {
    const res = yield call(apiPost, [`api/order/${payload.uid}`], payload.data);
    if (res.status == 200) {
      yield put(createOrderSuccess("Đặt hàng thành công"));
    } else {
      yield put(createOrderFailed("Đặt hàng không thành công"));
    }
  } catch (error) {
    yield put(createOrderFailed(error.message));
  }
}

export function* getListLocationByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/location/getLocationByUserId/${payload.id}`]);
    if (res.status == 200) {
      yield put(getListLocationByUserIdSuccess(res.data.data));
    } else {
      yield put(getListLocationByUserIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getListLocationByUserIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* paymentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.CREATE_ORDER, createOrder);
  yield takeEvery(types.GET_LIST_LOCATION_BY_USER_ID, getListLocationByUserId);
}
