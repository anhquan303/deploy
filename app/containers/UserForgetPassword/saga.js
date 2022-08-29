import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { forgetPasswordFailed, forgetPasswordSuccess, verifyEmailFailed, verifyEmailSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* forgetPassword({ payload }) {
  try {
    const res = yield call(apiPost, ['api/user/forgotPassword'], payload);
    if (res.status == 200) {
      //yield put(forgetPasswordSuccess(res.data.message));
      if (res.data.message == "INVALID") {
        yield put(forgetPasswordSuccess("Không tìm thấy số điện thoại!"));
      } else {
        yield put(forgetPasswordSuccess("Chúng tôi đã gửi mã otp tới quý khách"));
      }
    } else {
      yield put(forgetPasswordFailed('FAILED'));
    }
  } catch (error) {
    yield put(forgetPasswordFailed(error.message));
  }
}

export function* verifyEmail({ payload }) {
  try {
    const res = yield call(apiFetchData, [`https://emailvalidation.abstractapi.com/v1/?api_key=d8807e8ecc274e9ab1dd8934100dc9c5&email=${payload.email}`]);
    if (res.status == 200) {
      if (res.data.deliverability == "DELIVERABLE") {
        yield put(verifyEmailSuccess(res.data.deliverability));
      } else {
        yield put(verifyEmailFailed("Không tìm thấy địa chỉ email"))
      }
    } else {
      yield put(verifyEmailFailed("FAILED"))
    }

  } catch (error) {
    yield put(verifyEmailFailed(error.message));
  }
}

// Individual exports for testing
export default function* userForgetPasswordSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.FORGET_PASSWORD, forgetPassword);
  yield takeEvery(types.VERIFY_EMAIL, verifyEmail);
}
