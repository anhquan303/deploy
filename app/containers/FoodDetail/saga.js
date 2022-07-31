import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  addToCartFailed,
  addToCartSuccess,
  getFoodByIdFailed,
  getFoodByIdSuccess,
  getFoodByStoreIdFailed,
  getFoodByStoreIdSuccess,
  getListCommentFoodByIdFailed,
  getListCommentFoodByIdSuccess,
  getRatingFoodByIdFailed,
  getRatingFoodByIdSuccess,
} from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';

export function* getFoodById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/0/foods/${payload.id}/detail`]);
    if (res.status == 200) {
      yield put(getFoodByIdSuccess(res.data.data));
    } else {
      yield put(getFoodByIdFailed('Failed'));
    }
  } catch (error) {
    yield put(getFoodByIdFailed(error.message));
  }
}

export function* getRatingFoodById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/food/getFoodRating?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getRatingFoodByIdSuccess(res.data.avg_stars));
    } else {
      yield put(getRatingFoodByIdFailed('Failed'));
    }
  } catch (error) {
    yield put(getRatingFoodByIdFailed(error.message));
  }
}

export function* getListCommentFoodById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/food/getUsersComments?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getListCommentFoodByIdSuccess(res.data));
    } else {
      yield put(getListCommentFoodByIdFailed('Failed'));
    }
  } catch (error) {
    yield put(getListCommentFoodByIdFailed(error.message));
  }
}

export function* addToCart({ payload }) {
  try {
    const res = yield call(apiPost, [`api/cart/${payload.uid}/add/${payload.fid}`]);
    if (res.status == 200) {
      yield put(addToCartSuccess('ADD SUCCESS'));
    } else {
      yield put(addToCartFailed('Failed'));
    }
  } catch (error) {
    yield put(addToCartFailed(error.message));
  }
}

export function* getListFoodByStoreId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/${payload.id}/foods`]);
    if (res.status == 200) {
      yield put(getFoodByStoreIdSuccess(res.data.data));
    } else {
      yield put(getFoodByStoreIdFailed('Failed'));
    }
  } catch (error) {
    yield put(getFoodByStoreIdFailed(error.message));
  }
}

// Individual exports for testing
export default function* foodDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_FOOD_BY_ID, getFoodById);
  yield takeEvery(types.GET_RATING_FOOD_BY_ID, getRatingFoodById);
  yield takeEvery(types.GET_LIST_COMMENT_FOOD_BY_ID, getListCommentFoodById);
  yield takeEvery(types.GET_FOOD_BY_STORE_ID, getListFoodByStoreId);
  yield takeEvery(types.ADD_TO_CART, addToCart);
}
