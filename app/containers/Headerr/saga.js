import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getCartFailed, getCartSuccess, logOutFailed } from './actions';
import { apiFetchData, apiSignup } from './api';
import * as types from './constants';

export function* logOut({ payload }) {
  try {
    const res = yield call(apiSignup, ['auth/logout']);
  } catch (error) {
    yield put(logOutFailed(error.message));
  }
}

export function* getCart({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/cart/${payload.id}`]);
    if (res.status == 200) {
      yield put(getCartSuccess(res.data.data));
    } else {
      yield put(getCartFailed('FAILED'));
    }
  } catch (error) {
    yield put(getCartFailed(error.message));
  }
}

// Individual exports for testing
export default function* headerrSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.LOG_OUT, logOut);
  yield takeEvery(types.GET_CART, getCart);
}
