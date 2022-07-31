import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getReportByStoreIdFailed, getReportByStoreIdSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getListReportByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/report?storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getReportByStoreIdSuccess(res.data.data));
    } else {
      yield put(getReportByStoreIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getReportByStoreIdFailed(error.message));
  }
}
// Individual exports for testing
export default function* sellerReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_REPORT_BY_STORE_ID, getListReportByStoreId);
}
