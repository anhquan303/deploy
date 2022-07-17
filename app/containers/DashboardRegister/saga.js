import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchListRegisterFailed, fetchListRegisterSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* fetchListRegister({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/store/getbystatus?status=pending']);
    if (res.status == 200) {
      yield put(fetchListRegisterSuccess(res.data));
    } else {
      yield put(fetchListRegisterFailed("error"));
    }
  } catch (error) {
    yield put(fetchListRegisterFailed(error.message));
  }
}
// Individual exports for testing
export default function* dashboardRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.FETCH_LIST_REGISTER, fetchListRegister)
}
