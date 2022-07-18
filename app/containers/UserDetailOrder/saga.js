import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { cancelOrderFailed, getOrderDetailByIdFailed, getOrderDetailByIdSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* getOrderDetail({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order/${payload.id}/detail`]);
    if (res.status == 200) {
      yield put(getOrderDetailByIdSuccess(res.data.data));
    } else {
      yield put(getOrderDetailByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getOrderDetailByIdFailed(error.message));
  }
}

export function* cancelOrder({ payload }) {
  try {
    const res = yield call(apiPost, [`api/order/${payload.id}/cancel`]);
    console.log(res)
    // if (res.status == 200) {
    //   yield put(getOrderDetailByIdSuccess(res.data.data));
    // } else {
    //   yield put(getOrderDetailByIdFailed("FAILED"));
    // }
  } catch (error) {
    yield put(cancelOrderFailed(error.message));
  }
}
// Individual exports for testing
export default function* userDetailOrderSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER_DETAIL_BY_ID, getOrderDetail);
  yield takeEvery(types.CANCEL_ORDER, cancelOrder);
}
