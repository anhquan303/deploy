import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getReportByIdFailed, getReportByIdSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getReportById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/report/${payload.id}`])
    if (res.status == 200) {
      yield put(getReportByIdSuccess(res.data.data));
    } else {
      yield put(getReportByIdFailed("FAILED"))
    }
  } catch (error) {
    yield put(getReportByIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* sellerDetailReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_REPORT_BY_ID, getReportById);
}
