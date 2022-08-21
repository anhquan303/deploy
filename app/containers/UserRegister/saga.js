import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { sendOTPFailed, sendOTPSuccess, sendSMSFailed, sendSMSSuccess, signUpFailed, signUpSuccess, verifyEmailFailed, verifyEmailSuccess, verifyPhoneFailed, verifyPhoneSuccess } from './actions';
import { apiFetchData, apiSignup } from './api';
import * as types from './constants';



export function* signUp({ payload }) {
  try {
    const data = {
      username: payload.userName,
      password: payload.password,
      phone: payload.phone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      location: [{
        name: payload.location
      }],
      otp: payload.otp
    }
    const res = yield call(apiSignup, ['auth/adduser'], data);
    if (res.status == 200) {
      yield put(signUpSuccess(res.data.message))
    } else {
      yield put(signUpFailed(res.data.message))
    }

  } catch (error) {
    yield put(signUpFailed(error.message));
  }
}

// export function* sendSMS({ payload }) {
//   try {
//     const res = yield call(apiSignup, ['api/user/sendSms'], payload);
//     if (res.status == 200) {
//       yield put(sendSMSSuccess("Hệ thống đã gửi tin nhắn về số điện thoại của quý khách"))
//     } else {
//       yield put(sendSMSFailed("FAILED"))
//     }

//   } catch (error) {
//     yield put(sendSMSFailed(error.message));
//   }
// }

export function* sendOTP({ payload }) {
  try {
    const res = yield call(apiSignup, ['auth/sendOTP'], payload);
    if (res.status == 200) {
      yield put(sendOTPSuccess(res.data.body.message))
    } else {
      yield put(sendOTPFailed("FAILED"))
    }

  } catch (error) {
    yield put(sendOTPFailed(error.message));
  }
}

export function* verifyPhone({ payload }) {
  try {
    const res = yield call(apiSignup, ['auth/verifyOTP'], payload);
    if (res.status == 200) {
      yield put(verifyPhoneSuccess(res.data.body.message))
    } else {
      yield put(verifyPhoneFailed("FAILED"))
    }

  } catch (error) {
    yield put(verifyPhoneFailed(error.message));
  }
}

export function* verifyEmail({ payload }) {
  try {
    const res = yield call(apiFetchData, [`https://emailvalidation.abstractapi.com/v1/?api_key=5391a2514e424affa11dc8059c9a94c60&email=${payload.email}`]);
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
export default function* userRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.SIGN_UP, signUp);
  // yield takeEvery(types.SEND_SMS, sendSMS);
  yield takeEvery(types.SEND_OTP, sendOTP);
  yield takeEvery(types.VERIFY_PHONE, verifyPhone);
  yield takeEvery(types.VERIFY_EMAIL, verifyEmail);
}
