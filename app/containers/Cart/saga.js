import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import * as types from './constants';
import { apiChangeQuantity, apiFetchData } from './api';
import {
  addQuantityFoodFailed,
  addQuantityFoodSuccess,
  getOrderCartFailed,
  getOrderCartSuccess,
  subQuantityFoodSuccess,
  subQuantityFoodFailed,
  deleteFoodSuccess,
  deleteFoodFailed,
  deleteAllCartFailed,
  deleteAllCartSuccess,
  getVoucherFailed,
  getVoucherSuccess,
} from './actions';

export function* getCart({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/cart/${payload.uid}`]);
    if (res.status == 200) {
      yield put(getOrderCartSuccess(res.data.data));
    } else {
      yield put(declinedStoregetOrderCartFailedFailed('FAILED'));
    }
  } catch (error) {
    yield put(getOrderCartFailed(error.message));
  }
}

export function* addQuantity({ payload }) {
  try {
    const res = yield call(apiChangeQuantity, [
      `api/cart/${payload.uid}/add/${payload.fid}`,
    ]);
    if (res.status == 200) {
      yield put(addQuantityFoodSuccess('SUCCESS'));
    } else {
      yield put(addQuantityFoodFailed('FAILED'));
    }
  } catch (error) {
    yield put(addQuantityFoodFailed(error.message));
  }
}

export function* subQuantity({ payload }) {
  try {
    const res = yield call(apiChangeQuantity, [
      `api/cart/${payload.uid}/sub/${payload.fid}`,
    ]);
    if (res.status == 200) {
      yield put(subQuantityFoodSuccess('SUCCESS'));
    } else {
      yield put(subQuantityFoodFailed('FAILED'));
    }
  } catch (error) {
    yield put(subQuantityFoodFailed(error.message));
  }
}

export function* deleteFood({ payload }) {
  try {
    const res = yield call(apiChangeQuantity, [
      `api/cart/${payload.uid}/delete/${payload.fid}`,
    ]);
    if (res.status == 200) {
      yield put(deleteFoodSuccess('SUCCESS'));
    } else {
      yield put(deleteFoodFailed('FAILED'));
    }
  } catch (error) {
    yield put(deleteFoodFailed(error.message));
  }
}

export function* deleteAllCart({ payload }) {
  try {
    const res = yield call(apiChangeQuantity, [`api/cart/${payload.id}/clear`]);
    if (res.status == 200) {
      yield put(deleteAllCartSuccess("Xóa thành công"));
    } else {
      yield put(deleteAllCartFailed("Xóa thất bại"));
    }
  } catch (error) {
    yield put(deleteAllCartFailed(error.message));
  }
}

export function* getVoucher({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/voucher?userId=${payload.uid}`]);
    if (res.status == 200) {
      yield put(getVoucherSuccess(res.data.data));
    } else {
      yield put(getVoucherFailed("FAILED"));
    }
  } catch (error) {
    yield put(getVoucherFailed(error.message));
  }
}

// Individual exports for testing
export default function* cartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ORDER, getCart);
  yield takeEvery(types.ADD_QUANTITY_FOOD, addQuantity);
  yield takeEvery(types.SUB_QUANTITY_FOOD, subQuantity);
  yield takeEvery(types.DELETE_FOOD, deleteFood);
  yield takeEvery(types.DELETE_ALL_CART, deleteAllCart);
  yield takeEvery(types.GET_VOUCHER, getVoucher);
}
