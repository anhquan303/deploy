import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getDetailReportByIdFailed, getDetailReportByIdSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getReportByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/report/${payload.id}`]);
    if (res.status == 200) {
      yield put(getDetailReportByIdSuccess(res.data.data));
    } else {
      yield put(getDetailReportByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getDetailReportByIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* userDetailReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_DETAIL_REPORT_BY_ID, getReportByUserId);
}
