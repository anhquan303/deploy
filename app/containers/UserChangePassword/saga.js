import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  changePasswordFailed,
  changePasswordSuccess,
  logoutFailed,
  logoutSuccess,
} from './actions';
import { apiChangePass } from './api';
import * as types from './constants';

export function* changePassword({ payload }) {
  try {
    const data = {
      currentPassword: payload.oldPassword,
      password: payload.newPassword,
      confirmPassword: payload.verifyPassword,
    };
    const res = yield call(apiChangePass, ['api/user/changePassword'], data);
    if (res.status == 200) {
      yield put(changePasswordSuccess("Thay đổi mật khẩu thành công!"));
    } else {
      yield put(changePasswordFailed('Failed'));
    }
  } catch (error) {
    yield put(changePasswordFailed(error.message));
  }
}

export function* logOut({ payload }) {
  try {
    const res = yield call(apiChangePass, ['auth/logout']);
    if (res.status == 200) {
      // yield put(logoutSuccess("Success"));
    } else {
      // yield put(logoutFailed("Failed"));
    }
  } catch (error) {
    yield put(logoutFailed(error.message));
  }
}

// Individual exports for testing
export default function* userChangePasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.CHANGE_PASSWORD, changePassword);
  yield takeEvery(types.LOG_OUT, logOut);
}
