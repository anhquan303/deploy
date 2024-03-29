import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { declinedUserFailed, declinedUserSuccess, getLocationFailed, getLocationSuccess, getOrderByUserIdFailed, getOrderByUserIdSuccess, getUserByIdFailed, getUserByIdSuccess } from './actions';
import { apiFetchData, apiPost } from './api';
import * as types from './constants';


export function* getUserById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/user/getById?id=${payload.id}`]);
    if (res.status == 200) {
      yield put(getUserByIdSuccess(res.data.data[0]));
    } else {
      yield put(getUserByIdFailed("Failed"));
    }
  } catch (error) {
    yield put(getUserByIdFailed(error.message));
  }
}

export function* declinedUser({ payload }) {
  try {
    const res = yield call(apiPost, ['api/user/status'], payload);
    if (res.status == 200) {
      yield put(declinedUserSuccess("DECLINED SUCCESS"));
    } else {
      yield put(declinedUserFailed("Failed"));
    }
  } catch (error) {
    yield put(declinedUserFailed(error.message));
  }
}

export function* approveUser({ payload }) {
  try {
    const res = yield call(apiPost, ['api/user/status'], payload);
    if (res.status == 200) {
      yield put(declinedUserSuccess("APPROVED SUCCESS"));
    } else {
      yield put(declinedUserFailed("Failed"));
    }
  } catch (error) {
    yield put(declinedUserFailed(error.message));
  }
}

export function* getOrderByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order?pageSize=10000&userId=${payload.id}`]);
    if (res.status == 200) {
      yield put(getOrderByUserIdSuccess(res.data.data));
    } else {
      yield put(getOrderByUserIdFailed("Failed"));
    }
  } catch (error) {
    yield put(getOrderByUserIdFailed(error.message));
  }
}

export function* getListLocation({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/location/getLocationByUserId/${payload.id}`]);
    if (res.status == 200) {
      yield put(getLocationSuccess(res.data.data));
    } else {
      yield put(getLocationFailed("Failed"));
    }
  } catch (error) {
    yield put(getLocationFailed(error.message));
  }
}

// Individual exports for testing
export default function* detailCustomerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_USER_BY_ID, getUserById);
  yield takeEvery(types.DECLINED_USER, declinedUser);
  yield takeEvery(types.APPROVED_USER, approveUser);
  yield takeEvery(types.GET_ORDER_BY_USER_ID, getOrderByUserId);
  yield takeEvery(types.GET_LOCATION, getListLocation);
}
