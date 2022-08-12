import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  addLocationFailed, addLocationSuccess, changeDefaultLocationFailed, changeDefaultLocationSuccess, deleteLocationFailed, deleteLocationSuccess, getAllLocationFailed,
  getAllLocationSuccess, getListWardsFailed, getListWardsSuccess, getLocationByIdFailed, getLocationByIdSuccess,
  getLocationByUserIdFailed,
  getLocationByUserIdSuccess,
  updateLocationFailed, updateLocationSuccess
} from './actions';
import { apiDelete, apiFetchData, apiGetListWards, apiPost } from './api';
import * as types from './constants';

export function* getAllLocation({ payload }) {
  try {
    const res = yield call(apiFetchData, ['api/location/allLocation']);
    if (res.status == 200) {
      yield put(getAllLocationSuccess(res.data.data))
    } else {
      yield put(getAllLocationFailed("FAILED"))
    }
  } catch (error) {
    yield put(getAllLocationFailed(error.message));
  }
}

export function* getListWards({ payload }) {
  try {
    const res = yield call(apiGetListWards, []);
    if (res.status == 200) {
      yield put(getListWardsSuccess(res.data.wards))
    } else {
      yield put(getListWardsFailed("FAILED"))
    }
  } catch (error) {
    yield put(getListWardsFailed(error.message));
  }
}

export function* addLocation({ payload }) {
  try {
    const res = yield call(apiPost, [`api/location/insert/location`], payload);
    if (res.status == 200) {
      yield put(addLocationSuccess("Thêm địa chỉ thành công"));
    } else {
      yield put(addLocationFailed("Thêm địa chỉ thất bại"));
    }
  } catch (error) {
    yield put(addLocationFailed(error.message));
  }
}

export function* getLocationById({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/location/getLocationById/${payload.id}`]);
    if (res.status == 200) {
      yield put(getLocationByIdSuccess(res.data.data));
    } else {
      yield put(getLocationByIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getLocationByIdFailed(error.message));
  }
}

export function* updateLocation({ payload }) {
  try {
    const body = {
      name: payload.name,
      village: payload.village
    }
    const res = yield call(apiPost, [`api/location/updateLocation?locationId=${payload.id}`], body);
    if (res.status == 200) {
      yield put(updateLocationSuccess("Thay đổi địa chỉ thành công"));
    } else {
      yield put(updateLocationFailed("Thay đổi địa chỉ thất bại"));
    }
  } catch (error) {
    yield put(updateLocationFailed(error.message));
  }
}

export function* deleteLocation({ payload }) {
  try {
    const res = yield call(apiDelete, [`api/location/deleteLocation/${payload.id}`]);
    if (res.status == 200) {
      yield put(deleteLocationSuccess(res.data.body.message));
    } else {
      yield put(deleteLocationFailed("DELETE FAILED"));
    }
  } catch (error) {
    yield put(deleteLocationFailed(error.message));
  }
}

export function* getLocationByUserId({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/location/getLocationByUserId/${payload.id}`]);
    if (res.status == 200) {
      yield put(getLocationByUserIdSuccess(res.data.data));
    } else {
      yield put(getLocationByUserIdFailed("FAILED"));
    }
  } catch (error) {
    yield put(getLocationByUserIdFailed(error.message));
  }
}

export function* changeDefaultLocation({ payload }) {
  try {
    const res = yield call(apiPost, [`api/location/changeDefaultLocation/${payload.id}`]);
    if (res.status == 200) {
      yield put(changeDefaultLocationSuccess("Địa chỉ mặc định đã được thay đổi"));
    } else {
      yield put(changeDefaultLocationFailed("FAILED"));
    }
  } catch (error) {
    yield put(changeDefaultLocationFailed(error.message));
  }
}

// Individual exports for testing
export default function* userAddressSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_ALL_LOCATION, getAllLocation);
  yield takeEvery(types.GET_LIST_WARDS, getListWards);
  yield takeEvery(types.ADD_LOCATION, addLocation);
  yield takeEvery(types.GET_LOCATION_BY_ID, getLocationById);
  yield takeEvery(types.UPDATE_LOCATION, updateLocation);
  yield takeEvery(types.DELETE_LOCATION, deleteLocation);
  yield takeEvery(types.GET_LOCATION_BY_USER_ID, getLocationByUserId);
  yield takeEvery(types.CHANGE_DEFAULT_LOCATION, changeDefaultLocation);
}
