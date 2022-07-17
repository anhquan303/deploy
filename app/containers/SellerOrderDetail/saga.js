import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { changeStatusToOrderFailed, changeStatusToOrderSuccess, changeStatusToPaidFailed, changeStatusToPaidSuccess, getOrderDetailByIdFailed, getOrderDetailByIdSuccess } from './actions';
import { apiFetchData, apiSearchProduct } from './api';
import * as types from './constants';

export function* getOrderDetailById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order/${payload.id}/detail`]);
    if (res.status == 200) {
      yield put(getOrderDetailByIdSuccess(res.data.data));
    } else {
      yield put(getOrderDetailByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getOrderDetailByIdFailed(error.message));
  }
}

export function* changeStatusToOrder({ payload }) {
  try {
    const res = yield call(apiSearchProduct, [`api/order/${payload.id}/order`]);
    console.log(res)
    if (res.status == 200) {
      yield put(changeStatusToOrderSuccess("SUCCESS"));;
    } else {
      yield put(changeStatusToOrderFailed("FAILED"));
    }
  } catch (error) {
    yield put(changeStatusToOrderFailed(error.message));
  }
}

export function* changeStatusToPaid({ payload }) {
  try {
    const res = yield call(apiSearchProduct, [`api/order/${payload.id}/paid`]);
    console.log(res)
    if (res.status == 200) {
      yield put(changeStatusToPaidSuccess("SUCCESS"));;
    } else {
      yield put(changeStatusToPaidFailed("FAILED"));
    }
  } catch (error) {
    yield put(changeStatusToPaidFailed(error.message));
  }
}


// Individual exports for testing
export default function* sellerOrderDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER_DETAIL_BY_ID, getOrderDetailById);
  yield takeEvery(types.CHANGE_STATUS_TO_ORDER, changeStatusToOrder);
  yield takeEvery(types.CHANGE_STATUS_TO_PAID, changeStatusToPaid);
}
