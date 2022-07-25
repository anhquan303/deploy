import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { forgetPasswordFailed, forgetPasswordSuccess } from './actions';
import { apiPost } from './api';
import * as types from './constants';

export function* forgetPassword({ payload }) {
  try {
    const res = yield call(apiPost, ['api/user/forgotPassword'], payload);
    if (res.status == 200) {
      yield put(forgetPasswordSuccess(res.data.message));
    } else {
      yield put(forgetPasswordFailed('FAILED'));
    }
  } catch (error) {
    yield put(forgetPasswordFailed(error.message));
  }
}
// Individual exports for testing
export default function* userForgetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.FORGET_PASSWORD, forgetPassword);
}
