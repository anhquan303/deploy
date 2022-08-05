import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  addLocationFailed,
  addLocationSuccess,
  createOrderFailed, createOrderSuccess, createQRFailed, createQRSuccess, getListLocationByUserIdFailed,
  getListLocationByUserIdSuccess, getListOrderByUserIdFailed, getListOrderByUserIdSuccess, getListVoucherFailed, getListVoucherSuccess, getListWardsFailed, getListWardsSuccess
} from './actions';
import { apiFetchData, apiGetListWards, apiPost } from './api';
import * as types from './constants';

export function* createOrder({ payload }) {
  try {
    const res = yield call(apiPost, [`api/order/${payload.uid}`], payload.data);
    if (res.status == 200) {
      yield put(createOrderSuccess("Đặt hàng thành công"));
    } else {
      yield put(createOrderFailed("Đặt hàng không thành công"));
    }
  } catch (error) {
    yield put(createOrderFailed(error.message));
  }
}

export function* getListLocationByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/location/getLocationByUserId/${payload.id}`]);
    if (res.status == 200) {
      yield put(getListLocationByUserIdSuccess(res.data.data));
    } else {
      yield put(getListLocationByUserIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getListLocationByUserIdFailed(error.message));
  }
}


export function* getListWard({ payload }) {
  try {
    const res = yield call(apiGetListWards, []);
    if (res.status == 200) {
      yield put(getListWardsSuccess(res.data.wards))
    } else {
      yield put(getListWardsFailed("FAILED"))
    }
  } catch (error) {
    yield put(getListWardsFailed(error.message));
  }
}

export function* addLocation({ payload }) {
  try {
    const res = yield call(apiPost, [`api/location/insert/location`], payload);
    if (res.status == 200) {
      yield put(addLocationSuccess("Thêm địa chỉ thành công"))
    } else {
      yield put(addLocationFailed("Thêm địa chỉ thất bại"))
    }
  } catch (error) {
    yield put(addLocationFailed(error.message));
  }
}

export function* createQR({ payload }) {
  try {
    const res = yield call(apiPost, [`api/payment/createPayment`], payload);
    if (res.status == 200) {
      yield put(createQRSuccess(res.data.qr_code));
    } else {
      yield put(createQRFailed("Không thể tạo mã QR"))
    }
  } catch (error) {
    yield put(createQRFailed(error.message));
  }
}

export function* getListOrderByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?pageSize=1000&userId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getListOrderByUserIdSuccess(res.data.data));
    } else {
      yield put(getListOrderByUserIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getListOrderByUserIdFailed(error.message));
  }
}

export function* getListVoucher({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/voucher`]);
    if (res.status == 200) {
      yield put(getListVoucherSuccess(res.data.data));
    } else {
      yield put(getListVoucherFailed("FAILED"));
    }
  } catch (error) {
    yield put(getListVoucherFailed(error.message));
  }
}


// Individual exports for testing
export default function* paymentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.CREATE_ORDER, createOrder);
  yield takeEvery(types.GET_LIST_WARDS, getListWard);
  yield takeEvery(types.GET_LIST_LOCATION_BY_USER_ID, getListLocationByUserId);
  yield takeEvery(types.ADD_LOCATION, addLocation);
  yield takeEvery(types.CREATE_QR, createQR);
  yield takeEvery(types.GET_LIST_ORDER_BY_USER_ID, getListOrderByUserId);
  yield takeEvery(types.GET_LIST_VOUCHER, getListVoucher);
}
