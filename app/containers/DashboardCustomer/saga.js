import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchListUserFailed, fetchListUserSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';


export function* fetchListUser({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/user/allUser']);
    if (res.status == 200) {
      yield put(fetchListUserSuccess(res.data.data));
    } else {
      yield put(fetchListUserFailed(res.data.message));
    }
  } catch (error) {
    yield put(fetchListUserFailed(error.message));
  }
}

// Individual exports for testing
export default function* dashboardCustomerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.FETCH_LIST_USER, fetchListUser);
}
