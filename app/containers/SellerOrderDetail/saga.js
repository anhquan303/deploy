import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  changeStatusToDeliveredFailed,
  changeStatusToDeliveredSuccess,
  changeStatusToDeliveryFailed,
  changeStatusToDeliverySuccess,
  changeStatusToOrderFailed,
  changeStatusToOrderSuccess,
  changeStatusToPaidFailed,
  changeStatusToPaidSuccess,
  getOrderDetailByIdFailed,
  getOrderDetailByIdSuccess,
} from './actions';
import { apiFetchData, apiSearchProduct } from './api';
import * as types from './constants';

export function* getOrderDetailById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order/${payload.id}/detail`]);
    if (res.status == 200) {
      yield put(getOrderDetailByIdSuccess(res.data.data));
    } else {
      yield put(getOrderDetailByIdFailed('FAILED'));
    }
  } catch (error) {
    yield put(getOrderDetailByIdFailed(error.message));
  }
}

export function* changeStatusToOrder({ payload }) {
  try {
    const res = yield call(apiSearchProduct, [`api/order/${payload.id}/order`]);
    if (res.status == 200) {
      yield put(changeStatusToOrderSuccess('SUCCESS'));
    } else {
      yield put(changeStatusToOrderFailed('FAILED'));
    }
  } catch (error) {
    yield put(changeStatusToOrderFailed(error.message));
  }
}

export function* changeStatusToPaid({ payload }) {
  try {
    const res = yield call(apiSearchProduct, [`api/order/${payload.id}/paid`]);
    if (res.status == 200) {
      yield put(changeStatusToPaidSuccess('SUCCESS'));
    } else {
      yield put(changeStatusToPaidFailed('FAILED'));
    }
  } catch (error) {
    yield put(changeStatusToPaidFailed(error.message));
  }
}

export function* changeStatusToDelivery({ payload }) {
  try {
    const res = yield call(apiSearchProduct, [`api/order/${payload.id}/delivery`]);
    if (res.status == 200) {
      yield put(changeStatusToDeliverySuccess('SUCCESS'));
    } else {
      yield put(changeStatusToDeliveryFailed('FAILED'));
    }
  } catch (error) {
    yield put(changeStatusToDeliveryFailed(error.message));
  }
}

export function* changeStatusToDelivered({ payload }) {
  try {
    const res = yield call(apiSearchProduct, [`api/order/${payload.id}/delivered`]);
    if (res.status == 200) {
      yield put(changeStatusToDeliveredSuccess('SUCCESS'));
    } else {
      yield put(changeStatusToDeliveredFailed('FAILED'));
    }
  } catch (error) {
    yield put(changeStatusToDeliveredFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerOrderDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER_DETAIL_BY_ID, getOrderDetailById);
  yield takeEvery(types.CHANGE_STATUS_TO_ORDER, changeStatusToOrder);
  yield takeEvery(types.CHANGE_STATUS_TO_PAID, changeStatusToPaid);
  yield takeEvery(types.CHANGE_STATUS_TO_DELIVERY, changeStatusToDelivery);
  yield takeEvery(types.CHANGE_STATUS_TO_DELIVERED, changeStatusToDelivered);
}
