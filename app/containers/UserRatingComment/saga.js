import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import { userAddCommentFoodFailed, userAddCommentFoodSuccess, userRatingFoodFailed, userRatingFoodSuccess } from './actions';
import { apiPost } from './api';
import * as types from './constants';

export function* userAddCommentFood({ payload }) {
  try {
    const res = yield call(apiPost, [`api/store/food/addcomment`], payload);
    if (res.status == 200) {
      yield put(userAddCommentFoodSuccess("SUCCESS"));
    } else {
      yield put(userAddCommentFoodFailed("FAILED"));
    }
  } catch (error) {
    yield put(userAddCommentFoodFailed(error.message));
  }
}

export function* userRatingFood({ payload }) {
  try {
    const res = yield call(apiPost, [`api/store/food/addrating`], payload);
    if (res.status == 200) {
      yield put(userRatingFoodSuccess("SUCCESS"));
    } else {
      yield put(userRatingFoodFailed("FAILED"));
    }
  } catch (error) {
    yield put(userRatingFoodFailed(error.message));
  }
}


// Individual exports for testing
export default function* userRatingCommentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.USER_ADD_COMMENT_FOOD, userAddCommentFood);
  yield takeEvery(types.USER_RATING_FOOD, userRatingFood);
}
