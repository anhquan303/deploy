import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { activeVoucherByIdFailed, activeVoucherByIdSuccess, addVoucherFailed, addVoucherSuccess, deleteVoucherFailed, deleteVoucherSuccess, getVoucherByIdSuccess, getVoucherByStoreIdFailed, getVoucherByStoreIdSuccess, inActiveVoucherByIdFailed, inActiveVoucherByIdSuccess, updateVoucherByIdFailed, updateVoucherByIdSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* addVoucher({ payload }) {
  try {
    const res = yield call(apiPost, ['api/voucher'], payload);
    if (res.status == 200) {
      yield put(addVoucherSuccess("Thêm voucher thành công"));
    } else {
      yield put(addVoucherFailed("Thêm voucher thất bại"));
    }
  } catch (error) {
    yield put(addVoucherFailed(error.message));
  }
}

export function* getVoucherByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/voucher?storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getVoucherByStoreIdSuccess(res.data.data));
    } else {
      yield put(getVoucherByStoreIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getVoucherByStoreIdFailed(error.message));
  }
}

export function* getVoucherById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/voucher/${payload.id}`]);
    if (res.status == 200) {
      yield put(getVoucherByIdSuccess(res.data.data));
    } else {
      yield put(getVoucherByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getVoucherByIdFailed(error.message));
  }
}

export function* updateVoucherById({ payload }) {
  try {
    const res = yield call(apiPost, [`api/voucher/${payload.id}/update`], payload.body);
    if (res.status == 200) {
      yield put(updateVoucherByIdSuccess("Thay đổi voucher thành công"));
    } else {
      yield put(updateVoucherByIdFailed("Thay đổi voucher thất bại"));
    }
  } catch (error) {
    yield put(updateVoucherByIdFailed(error.message));
  }
}

export function* deleteVoucherById({ payload }) {
  try {
    const res = yield call(apiPost, [`api/voucher/${payload.id}/delete`]);
    if (res.status == 200) {
      yield put(deleteVoucherSuccess("Xóa voucher thành công"));
    } else {
      yield put(deleteVoucherFailed("Xóa voucher thất bại"));
    }
  } catch (error) {
    yield put(deleteVoucherFailed(error.message));
  }
}

export function* inActiveVoucher({ payload }) {
  try {
    const res = yield call(apiPost, [`api/voucher/${payload.id}/inActive`]);
    if (res.status == 200) {
      yield put(inActiveVoucherByIdSuccess("Inactive thành công"));
    } else {
      yield put(inActiveVoucherByIdFailed("Inactive thất bại"));
    }
  } catch (error) {
    yield put(inActiveVoucherByIdFailed(error.message));
  }
}

export function* activeVoucher({ payload }) {
  try {
    const res = yield call(apiPost, [`api/voucher/${payload.id}/active`]);
    if (res.status == 200) {
      yield put(activeVoucherByIdSuccess("Active thành công"));
    } else {
      yield put(activeVoucherByIdFailed("Active thất bại"));
    }
  } catch (error) {
    yield put(activeVoucherByIdFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerVoucherSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.ADD_VOUCHER, addVoucher);
  yield takeEvery(types.GET_VOUCHER_BY_STORE_ID, getVoucherByStoreId);
  yield takeEvery(types.GET_VOUCHER_BY_ID, getVoucherById);
  yield takeEvery(types.UPDATE_VOUCHER_BY_ID, updateVoucherById);
  yield takeEvery(types.DELETE_VOUCHER_BY_ID, deleteVoucherById);
  yield takeEvery(types.INACTIVE_VOUCHER_BY_ID, inActiveVoucher);
  yield takeEvery(types.ACTIVE_VOUCHER_BY_ID, activeVoucher);
}
