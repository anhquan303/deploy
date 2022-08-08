import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { addToCartFailed, addToCartSuccess } from './actions';
import * as types from './constants';

export function* addToCart({ payload }) {
  try {
    const res = yield call(apiPost, [`api/cart/${payload.uid}/add/${payload.fid}`]);
    console.log(res)
    if (res.status == 200) {
      yield put(addToCartSuccess('ADD SUCCESS'));
    } else {
      yield put(addToCartFailed('Failed'));
    }
  } catch (error) {
    yield put(addToCartFailed(error.message));
  }
}

// Individual exports for testing
export default function* cardItemFoodSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.ADD_TO_CART, addToCart);
}
