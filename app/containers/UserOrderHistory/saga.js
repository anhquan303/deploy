import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getOrderByIdFailed, getOrderByIdSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getListOrderByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?userId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getOrderByIdSuccess(res.data.data));
    } else {
      yield put(getOrderByIdFailed('FAILED'));
    }
  } catch (error) {
    yield put(getOrderByIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* userOrderHistorySaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER_BY_USER_ID, getListOrderByUserId);
}
