import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { addProductFailed, addProductSuccess } from './actions';
import { apiAddProduct } from './api';
import * as types from './constants';

export function* addProduct({ payload }) {
  try {
    const data = {
      name: payload.name,
      price: payload.price,
      type: payload.type,
      description: payload.description,
      image: payload.image,
      status: "",
    }
    const res = yield call(apiAddProduct, [`api/store/${payload.storeId}/foods`], data);
    if (res.status == 200) {
      yield put(addProductSuccess("ADD SUCCESSFUL"));
    } else {
      yield put(addProductFailed("ADD FAILED"));
    }
  } catch (error) {
    yield put(addProductFailed(error.message));
  }
}


// Individual exports for testing
export default function* sellerAddProductSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.ADD_PRODUCT, addProduct);
}
