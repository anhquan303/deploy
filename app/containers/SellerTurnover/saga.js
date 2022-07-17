import { castArray } from 'lodash';
import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { getDataForChartFailed, getDataForChartSuccess } from './actions';
import { apiFetchData } from './api';
import * as types from './constants';

export function* getDataForChart({ payload }) {
  try {
    const res = yield call(apiFetchData, [`api/order/figures?storeId=${payload.sid}&days=${payload.days}`]);
    if (res.status == 200) {
      yield put(getDataForChartSuccess((res.data.data)));
    } else {
      yield put(getDataForChartFailed("FAILED"));
    }
  } catch (error) {
    yield put(getDataForChartFailed(error.message));
  }

}
// Individual exports for testing
export default function* sellerTurnoverSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.GET_DATA_FOR_CHART, getDataForChart);
}
