import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { resetPasswordFailed, resetPasswordSuccess } from './actions';
import { apiPost } from './api';
import * as types from './constants';

export function* resetPassword({ payload }) {
  try {
    const res = yield call(apiPost, ['api/user/resetPassword'], payload);
    if (res.status == 200) {
      yield put(resetPasswordSuccess(res.data.message));
    } else {
      yield put(resetPasswordFailed('Failed'));
    }
  } catch (error) {
    yield put(resetPasswordFailed(error.message));
  }
}
// Individual exports for testing
export default function* userResetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.RESET_PASSWORD, resetPassword);
}
