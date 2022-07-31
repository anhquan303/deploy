import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getReportByIdFailed, getReportByIdSuccess, sendReplyFailed, sendReplySuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* getReportById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/report/${payload.id}`]);
    if (res.status == 200) {
      yield put(getReportByIdSuccess(res.data.data));
    } else {
      yield put(getReportByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getReportByIdFailed(error.message));
  }
}

export function* sendReply({ payload }) {
  try {
    const res = yield call(apiPost, [`api/report/${payload.id}/changeStatus`], payload.body);
    if (res.status == 200) {
      yield put(sendReplySuccess("Gửi thành công"));
    } else {
      yield put(sendReplyFailed("Gửi thất bại"));
    }
  } catch (error) {
    yield put(sendReplyFailed(error.message));
  }
}

// Individual exports for testing
export default function* detailReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_REPORT_BY_ID, getReportById);
  yield takeEvery(types.SEND_REPLY, sendReply);
}
