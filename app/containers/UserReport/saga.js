import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getListReportByUserIdFailed, getListReportByUserIdSuccess, userAddReportFailed, userAddReportSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* getListReportByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/report?userid=${payload.id}`]);
    if (res.status == 200) {
      yield put(getListReportByUserIdSuccess(res.data.data))
    } else {
      yield put(getListReportByUserIdFailed("FAILED"))
    }
  } catch (error) {
    yield put(getListReportByUserIdFailed(error.message));
  }
}

export function* userAddReport({ payload }) {
  try {
    const res = yield call(apiPost, [`api/report`], payload);
    if (res.status == 200) {
      yield put(userAddReportSuccess("Tạo report thành công"))
    } else {
      yield put(userAddReportFailed("Tạo report thất bại"))
    }
  } catch (error) {
    yield put(userAddReportFailed(error.message));
  }
}

// Individual exports for testing
export default function* userReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_LIST_REPORT_BY_USER_ID, getListReportByUserId);
  yield takeEvery(types.USER_ADD_REPORT, userAddReport);
}
