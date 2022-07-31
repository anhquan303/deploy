import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getAllReportFailed, getAllReportSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';


export function* getAllReport({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/report`]);
    if (res.status == 200) {
      yield put(getAllReportSuccess(res.data.data));
    } else {
      yield put(getAllReportFailed("FAILED"));
    }
  } catch (error) {
    yield put(getAllReportFailed(error.message));
  }
}
// Individual exports for testing
export default function* dashboardReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ALL_REPORT, getAllReport);
}
