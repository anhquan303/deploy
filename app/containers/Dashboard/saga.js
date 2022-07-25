import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getAllFoodFailed, getAllFoodSuccess, getAllStoreFailed, getAllStoreSuccess, getAllUserFailed, getAllUserSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';




export function* getAllStore({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/store/getbystatus?status=approved']);
    if (res.status == 200) {
      yield put(getAllStoreSuccess(res.data));
    } else {
      yield put(getAllStoreFailed("error"));
    }
  } catch (error) {
    yield put(getAllStoreFailed(error.message));
  }
}

export function* getAllUser({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/user/allUser']);
    if (res.status == 200) {
      yield put(getAllUserSuccess(res.data.data));
    } else {
      yield put(getAllUserFailed("error"));
    }
  } catch (error) {
    yield put(getAllUserFailed(error.message));
  }
}

export function* getAllFood({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/store/0/foods']);
    if (res.status == 200) {
      yield put(getAllFoodSuccess(res.data.data));
    } else {
      yield put(getAllFoodFailed("error"));
    }
  } catch (error) {
    yield put(getAllFoodFailed(error.message));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ALL_STORE, getAllStore);
  yield takeEvery(types.GET_ALL_USER, getAllUser);
  yield takeEvery(types.GET_ALL_FOOD, getAllFood);
}




