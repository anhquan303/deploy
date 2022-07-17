import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from './actions';
import { apiLogin } from './api';
import * as types from './constants';
import apiBase from '../../utils/baseAPI';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import { useHistory } from 'react-router-dom';


export function* login({ payload }) {
  try {
    const data = {
      username: payload.username,
      password: payload.password
    }


    const res = yield call(apiLogin, ['auth/login'], data);
    if (res.data.success == true) {
    //if (res.status == 200) {
      setUserSession(res.data.accessToken, res.data.user, res.data.store)
      yield put(loginSuccess("Login success"))
    } else {
      yield put(loginFailed(res.data.msg))
    }


  } catch (error) {
    yield put(loginFailed(error.message));
  }

}



// Individual exports for testing
export default function* loginSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.LOGIN, login);
}
