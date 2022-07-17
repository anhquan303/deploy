import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { fetchListFoodFailed, fetchListFoodSuccess, searchFoodFailed, searchFoodSuccess } from './actions';
import { apiFetchData, apiSearchProduct } from './api';
import * as types from './constants';

export function* fetchListFood({ payload }) {
  try {

    const res = yield call(apiFetchData, [`api/store/${payload.id}/foods`]);
    console.log(res)
    if (res.status == 200) {
      yield put(fetchListFoodSuccess(res.data.data));
    } else {
      yield put(fetchListFoodFailed("loi"))
    }
  } catch (error) {
    yield put(fetchListFoodFailed(error.message));
  }
}

export function* searchFood({ payload }) {
  try {
    //const call = 'api/foods';
    // if (payload.name != "") {
    //   call += `name=${payload.name}&`;
    // }
    // if (payload.startPrice != "") {
    //   call += `startPrice=${payload.startPrice}&`;
    // }
    // if (payload.endPrice != "") {
    //   call += `endPrice=${payload.endPrice}&`;
    // }

    // console.log(call)

    var url = `api/store/${payload.id}/foods`;
    if (payload.name != "" && payload.startPrice == "" && payload.endPrice == "") {
      url = `api/store/${payload.id}/foods?name=` + `${payload.name}`;
    }
    if (payload.startPrice != "" && payload.name == "" && payload.endPrice == "") {
      url = `api/store/${payload.id}/foods?startPrice=` + `${payload.startPrice}`;
    }
    if (payload.endPrice != "" && payload.name == "" && payload.startPrice == "") {
      url = `api/store/${payload.id}/foods?endPrice=` + `${payload.endPrice}`;
    }
    if (payload.endPrice != "" && payload.name != "" && payload.startPrice == "") {
      url = `api/store/${payload.id}/foods?name=` + `${payload.name}` + '&&endPrice=' + `${payload.endPrice}`;
    }
    if (payload.endPrice != "" && payload.name == "" && payload.startPrice != "") {
      url = `api/store/${payload.id}?startPrice=` + `${payload.startPrice}` + '&&endPrice=' + `${payload.endPrice}`;
    }
    if (payload.endPrice == "" && payload.name != "" && payload.startPrice != "") {
      url = `api/store/${payload.id}?name=` + `${payload.name}` + '&&startPrice=' + `${payload.startPrice}`;
    }
    if (payload.endPrice != "" && payload.name != "" && payload.startPrice != "") {
      url = `api/store/${payload.id}?name=` + `${payload.name}` + '&&startPrice=' + `${payload.startPrice}` + '&&endPrice=' + `${payload.endPrice}`;
    }

    const res = yield call(apiFetchData, [`${url}`]);
    console.log(res)
    if (res.status == 200) {
      yield put(searchFoodSuccess(res.data.data));
    } else {
      yield put(searchFoodFailed("loi"))
    }

    // if (res.status == 200) {
    //   yield put(fetchListFoodSuccess(res.data.data));
    // } else {
    //   yield put(fetchListFoodFailed("loi"))
    // }
  } catch (error) {
    yield put(searchFoodFailed(error.message));
  }
}


// Individual exports for testing
export default function* sellerManagerProductSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.FETCH_LIST_FOOD, fetchListFood);
  yield takeEvery(types.SEARCH_FOOD, searchFood);
}
