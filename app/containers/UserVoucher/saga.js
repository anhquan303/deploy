import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getListVoucherByUserIdFailed, getListVoucherByUserIdSuccess, userDeleteVoucherByIdFailed, userDeleteVoucherByIdSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* getListVoucherByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/voucher?userId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getListVoucherByUserIdSuccess(res.data.data));
    } else {
      yield put(getListVoucherByUserIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getListVoucherByUserIdFailed(error.message));
  }
}

export function* deleteVoucherById({ payload }) {
  try {
    const res = yield call(apiPost, [`api/voucher/${payload.vid}/userDelete/${payload.uid}`]);
    if (res.status == 200) {
      yield put(userDeleteVoucherByIdSuccess("Xóa voucher thành công"));
    } else {
      yield put(userDeleteVoucherByIdFailed("Xóa voucher thất bại"));
    }
  } catch (error) {
    yield put(userDeleteVoucherByIdFailed(error.message));
  }
}

// Individual exports for testing
export default function* userVoucherSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_LIST_VOUCHER_BY_USER_ID, getListVoucherByUserId);
  yield takeEvery(types.USER_DELETE_VOUCHER_ID, deleteVoucherById);
}
