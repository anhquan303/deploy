import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getOrderByStoreIdFailed, getOrderByStoreIdSuccess } from './actions';
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
// Individual exports for testing
export default function* sellerManagerOrderSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER_BY_STORE_ID, getOrderByStoreId);
}
