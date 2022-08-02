import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { activeProductFailed, activeProductSuccess, deactiveProductFailed, deactiveProductSuccess, deleteProductFailed, deleteProductSuccess, getProductByIdFailed, getProductByIdSuccess, updateProductFailed, updateProductSuccess } from './actions';
import { apiFetchData, apiUpdateProduct, uploadImage } from './api';
import * as types from './constants';


export function* deleteProduct({ payload }) {
  try {
    const res = yield call(apiUpdateProduct, [`api/store/${payload.storeId}/foods/${payload.id}/delete`]);
    if (res.status == 200) {
      yield put(deleteProductSuccess("DELETE SUCCESSFUL"));
    } else {
      yield put(deleteProductFailed("DELETE FAILED"));
    }
  } catch (error) {
    yield put(deleteProductFailed(error.message));
  }
}

export function* updateProduct({ payload }) {
  try {
    const formData = new FormData();
    if (payload.image != null) {
      formData.append('name', payload.name);
      formData.append('price', payload.price);
      formData.append('type', payload.type);
      formData.append('description', payload.description);
      formData.append('imageFile', payload.image);
      formData.append('status', "Active");
    } else {
      formData.append('name', payload.name);
      formData.append('price', payload.price);
      formData.append('type', payload.type);
      formData.append('description', payload.description);
      formData.append('status', "Active");
    }

    // const data = {
    //   name: payload.name,
    //   price: payload.price,
    //   type: payload.type,
    //   description: payload.description,
    //   image: payload.image,
    //   status: "Active"
    // }
    const res = yield call(uploadImage, [`api/store/${payload.storeId}/foods/${payload.id}/update`], formData);
    if (res.status == 200) {
      yield put(updateProductSuccess("UPDATE SUCCESSFUL"));
    } else {
      yield put(updateProductFailed("UPDATE FAILED"));
    }
  } catch (error) {
    yield put(updateProductFailed(error.message));
  }
}

export function* getProductById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/0/foods/${payload.id}/detail`]);
    if (res.status == 200) {
      yield put(getProductByIdSuccess(res.data.data));
    } else {
      yield put(getProductByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getProductByIdFailed(error.message));
  }
}

export function* activeProduct({ payload }) {
  try {
    const res = yield call(apiUpdateProduct, [`api/store/${payload.sid}/foods/${payload.fid}/active`]);
    if (res.status == 200) {
      yield put(activeProductSuccess("ACTIVE"));
    } else {
      yield put(activeProductFailed("FAILED"));
    }
  } catch (error) {
    yield put(activeProductFailed(error.message));
  }
}

export function* deactiveProduct({ payload }) {
  try {
    const res = yield call(apiUpdateProduct, [`api/store/${payload.sid}/foods/${payload.fid}/de-active`]);
    if (res.status == 200) {
      yield put(deactiveProductSuccess("DEACTIVE"));
    } else {
      yield put(deactiveProductFailed("FAILED"));
    }
  } catch (error) {
    yield put(deactiveProductFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerActionProductSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.DELETE_PRODUCT, deleteProduct);
  yield takeEvery(types.UPDATE_PRODUCT, updateProduct);
  yield takeEvery(types.GET_PRODUCT_BY_ID, getProductById);
  yield takeEvery(types.ACTIVE_PRODUCT, activeProduct);
  yield takeEvery(types.DEACTIVE_PRODUCT, deactiveProduct);
}
