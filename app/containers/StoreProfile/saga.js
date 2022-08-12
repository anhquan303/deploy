import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { addVoucherByUserIdFailed, addVoucherByUserIdSuccess, getFoodByStoreIdFailed, getFoodByStoreIdSuccess, getStoreByIdFailed, getStoreByIdSuccess, getStoreCommentFailed, getStoreCommentSuccess, getStoreRatingFailed, getStoreRatingSuccess, getVoucherByStoreIdFailed, getVoucherByStoreIdSuccess, userAddReportFailed, userAddReportSuccess } from './actions';
import { apiFetchData, apiPost, uploadImage } from './api';
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
    const res = yield call(apiFetchData, [`api/store/${payload.id}/foods?type=${payload.type}`]);
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
    if (res.status == 200) {
      yield put(addVoucherByUserIdSuccess("thêm thành công"));
    } else {
      yield put(addVoucherByUserIdFailed("thêm thất bại"));
    }
  } catch (error) {
    yield put(addVoucherByUserIdFailed(error.message));
  }
}


export function* userAddReport({ payload }) {
  try {
    const formData = new FormData();
    formData.append('userId', payload.userId);
    formData.append('storeId', payload.storeId);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('imageFile', payload.image);
    formData.append('userToStore', payload.userToStore);


    const res = yield call(uploadImage, [`api/report`], formData);
    if (res.status == 200) {
      yield put(userAddReportSuccess("Tạo report thành công"))
    } else {
      yield put(userAddReportFailed("Tạo report thất bại"))
    }
  } catch (error) {
    yield put(userAddReportFailed(error.message));
  }
}

export function* getStoreComment({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/store/getUsersComments?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getStoreCommentSuccess(res.data))
    } else {
      yield put(getStoreCommentFailed("thất bại"))
    }
  } catch (error) {
    yield put(getStoreCommentFailed(error.message));
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
  yield takeEvery(types.USER_ADD_REPORT, userAddReport);
  yield takeEvery(types.GET_STORE_COMMENT, getStoreComment);
}
