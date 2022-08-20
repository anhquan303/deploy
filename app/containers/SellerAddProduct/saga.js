import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { addProductFailed, addProductSuccess } from './actions';
import { apiAddProduct, uploadImage } from './api';
import * as types from './constants';

export function* addProduct({ payload }) {
  try {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('price', payload.price);
    formData.append('type', payload.type);
    formData.append('description', payload.description);
    formData.append('imageFile', payload.image);
    formData.append('status', "a");
    // const data = {
    //   name: payload.name,
    //   price: payload.price,
    //   type: payload.type,
    //   description: payload.description,
    //   image: payload.image,
    //   status: "",
    // }

    const res = yield call(uploadImage, [`api/store/${payload.storeId}/foods`], formData);
    if (res.status == 200) {
      yield put(addProductSuccess("Thêm sản phẩm thành công"));
    } else {
      yield put(addProductFailed("Thêm sản phẩm thất bại"));
    }
  } catch (error) {
    yield put(addProductFailed(error.response.data.message));
  }
}


// Individual exports for testing
export default function* sellerAddProductSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.ADD_PRODUCT, addProduct);
}
