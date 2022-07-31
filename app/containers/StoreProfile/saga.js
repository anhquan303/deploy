import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { addVoucherByUserIdFailed, getFoodByStoreIdFailed, getFoodByStoreIdSuccess, getStoreByIdFailed, getStoreByIdSuccess, getStoreRatingFailed, getStoreRatingSuccess, getVoucherByStoreIdFailed, getVoucherByStoreIdSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* getStoreById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/detail?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getStoreByIdSuccess(res.data))
    } else {
      yield put(getStoreByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getStoreByIdFailed(error.message));
  }
}

export function* getFoodByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/${payload.id}/foods`]);
    if (res.status == 200) {
      yield put(getFoodByStoreIdSuccess(res.data.data))
    } else {
      yield put(getFoodByStoreIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getFoodByStoreIdFailed(error.message));
  }
}

export function* getStoreRating({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/getStoreRating?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getStoreRatingSuccess(res.data.avg_stars))
    } else {
      yield put(getStoreRatingFailed("FAILED"));
    }
  } catch (error) {
    yield put(getStoreRatingFailed(error.message));
  }
}

export function* getVoucherByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/voucher?storeId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getVoucherByStoreIdSuccess(res.data.data))
    } else {
      yield put(getVoucherByStoreIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getVoucherByStoreIdFailed(error.message));
  }
}

export function* addVoucherByUserId({ payload }) {
  try {
    const res = yield call(apiPost, [`api/voucher/${payload.vid}/userGet/${payload.uid}`]);
    console.log(res)
    // if (res.status == 200) {
    //   yield put(getVoucherByStoreIdSuccess(res.data.data))
    // } else {
    //   yield put(getVoucherByStoreIdFailed("FAILED"));
    // }
  } catch (error) {
    yield put(addVoucherByUserIdFailed(error.message));
  }
}


// Individual exports for testing
export default function* storeProfileSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_STORE_BY_ID, getStoreById);
  yield takeEvery(types.GET_FOOD_BY_STORE_ID, getFoodByStoreId);
  yield takeEvery(types.GET_STORE_RATING, getStoreRating);
  yield takeEvery(types.GET_VOUCHER_BY_STORE_ID, getVoucherByStoreId);
  yield takeEvery(types.ADD_VOUCHER_BY_USER_ID, addVoucherByUserId);
}
