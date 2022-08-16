import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getUserByIdFailed, getUserByIdSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getUserById({ payload }) {
  try {
    const res = yield call(apiFetchData, `api/user/getById?id=${payload.id}`);
    if (res.status == 200) {
      yield put(getUserByIdSuccess(res.data.data[0]));
    } else {
      yield put(getUserByIdFailed('FAILED'));
    }
  } catch (error) {
    yield put(getUserByIdFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerHomePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_USER_BY_ID, getUserById);
}
