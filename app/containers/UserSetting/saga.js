import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getUserByIdFailed,
  getUserByIdSuccess,
  sendOTPEmailFailed,
  sendOTPEmailSuccess,
  sendOTPFailed,
  sendOTPSuccess,
  updateEmailFailed,
  updateEmailSuccess,
  updatePhoneEmailFailed,
  updatePhoneEmailSuccess,
  updateUserFailed,
  updateUserSuccess,
  verifyEmailFailed,
  verifyEmailSuccess,
  verifyPhoneFailed,
  verifyPhoneSuccess,
} from './actions';
import { apiFetchData, apiSignup, uploadImage } from './api';
import * as types from './constants';

export function* updateUser({ payload }) {
  try {
    const formData = new FormData();
    if (payload.avatarFile != null) {
      formData.append('firstname', payload.firstname);
      formData.append('lastname', payload.lastname);
      formData.append('gender', payload.gender);
      formData.append('dateOfBirth', payload.dateOfBirth);
      formData.append('avatarFile', payload.avatarFile);
    } else {
      formData.append('firstname', payload.firstname);
      formData.append('lastname', payload.lastname);
      formData.append('gender', payload.gender);
      formData.append('dateOfBirth', payload.dateOfBirth);
    }
    const res = yield call(uploadImage, ['api/user/update'], formData);

    if (res.status == 200) {
      yield put(updateUserSuccess('Thay đổi thành công!'));
    } else {
      yield put(updateUserFailed('UPDATE FAILED'));
    }
  } catch (error) {
    yield put(updateUserFailed(error.response.data.error));
  }
}

export function* getUserById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/user/getById?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getUserByIdSuccess(res.data.data[0]));
    } else {
      yield put(getUserByIdFailed('Failed'));
    }
  } catch (error) {
    yield put(getUserByIdFailed(error.message));
  }
}

export function* sendOTP({ payload }) {
  try {
    const res = yield call(apiSignup, ['auth/sendOTP'], payload);
    if (res.status == 200) {
      yield put(sendOTPSuccess("Chúng tôi đã gửi mã đến số điện thoại mới!"))
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

export function* changePhoneEmail({ payload }) {
  try {
    const res = yield call(apiSignup, ['api/user/updateVerifyInfo'], payload);
    if (res.status == 200) {
      yield put(updatePhoneEmailSuccess("Thay đổi số điện thoại thành công!"))
    } else {
      yield put(updatePhoneEmailFailed("FAILED"))
    }

  } catch (error) {
    yield put(updatePhoneEmailFailed(error.message));
  }
}

export function* verifyEmail({ payload }) {
  try {
    const res = yield call(apiFetchData, [`https://emailvalidation.abstractapi.com/v1/?api_key=8018df0b48e445d8b68fb199802e8884&email=${payload.email}`]);
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

export function* sendOTPEmail({ payload }) {
  try {
    const res = yield call(apiSignup, ['api/user/sendEmail'], payload);
    if (res.status == 200) {
      yield put(sendOTPEmailSuccess("Chúng tôi đã gửi mã tới địa chỉ email mới!"));
    } else {
      yield put(sendOTPEmailFailed('FAILED'));
    }
  } catch (error) {
    yield put(sendOTPEmailFailed(error.message));
  }
}

export function* updateEmail({ payload }) {
  try {
    const res = yield call(apiSignup, ['api/user/updateEmail'], payload);
    if (res.status == 200) {
      yield put(updateEmailSuccess("Thay đổi email thành công!"));
    } else {
      yield put(updateEmailFailed('FAILED'));
    }
  } catch (error) {
    yield put(updateEmailFailed(error.message));
  }
}

// Individual exports for testing
export default function* userSettingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.UPDATE_USER, updateUser);
  yield takeEvery(types.GET_USER_BY_ID, getUserById);
  yield takeEvery(types.SEND_OTP, sendOTP);
  yield takeEvery(types.VERIFY_PHONE, verifyPhone);
  yield takeEvery(types.UPDATE_PHONE_EMAIL, changePhoneEmail);
  yield takeEvery(types.VERIFY_EMAIL, verifyEmail);
  yield takeEvery(types.SEND_OTP_EMAIL, sendOTPEmail);
  yield takeEvery(types.UPDATE_EMAIL, updateEmail);
}
