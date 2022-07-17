import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { signUpFailed, signUpSuccess } from './actions';
import { apiSignup } from './api';
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
      }]
    }
    const res = yield call(apiSignup, ['auth/adduser'], data);
    if (res.status == 200) {
      yield put(signUpSuccess(res.data.msg))
    } else {
      yield put(signUpFailed(res.data.msg))
    }

  } catch (error) {
    yield put(signUpFailed(error.message));
  }
}


// Individual exports for testing
export default function* userRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.SIGN_UP, signUp);
}
