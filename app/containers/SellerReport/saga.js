import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getReportByStoreIdFailed, getReportByStoreIdSuccess, storeAddReportFailed, storeAddReportSuccess } from './actions';
import { apiFetchData, apiPost, uploadImage } from './api';
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

export function* storeAddReport({ payload }) {
  try {
    const formData = new FormData();
    formData.append('userId', payload.userId);
    formData.append('storeId', payload.storeId);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('imageFile', payload.image);
    formData.append('userToStore', payload.userToStore);

    const res = yield call(uploadImage, [`api/report`], formData);
    if (res.status == 200) {
      yield put(storeAddReportSuccess("Tạo báo cáo thành công"));
    } else {
      yield put(storeAddReportFailed("Tạo báo cáo thất bại"));
    }
  } catch (error) {
    yield put(storeAddReportFailed(error.message));
  }
}
// Individual exports for testing
export default function* sellerReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_REPORT_BY_STORE_ID, getListReportByStoreId);
  yield takeEvery(types.STORE_ADD_REPORT, storeAddReport);
}
