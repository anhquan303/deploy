/*
 *
 * UserRatingComment actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function userAddCommentStore(payload) {
  return {
    type: types.USER_ADD_COMMENT_STORE,
    payload,
  };
}

export function userAddCommentStoreSuccess(payload) {
  return {
    type: types.USER_ADD_COMMENT_STORE_SUCCESS,
    payload,
  };
}

export function userAddCommentStoreFailed(payload) {
  return {
    type: types.USER_ADD_COMMENT_STORE_FAILED,
    payload,
  };
}

export function userAddCommentFood(payload) {
  return {
    type: types.USER_ADD_COMMENT_FOOD,
    payload,
  };
}

export function userAddCommentFoodSuccess(payload) {
  return {
    type: types.USER_ADD_COMMENT_FOOD_SUCCESS,
    payload,
  };
}

export function userAddCommentFoodFailed(payload) {
  return {
    type: types.USER_ADD_COMMENT_FOOD_FAILED,
    payload,
  };
}

export function userRatingFood(payload) {
  return {
    type: types.USER_RATING_FOOD,
    payload,
  };
}

export function userRatingFoodSuccess(payload) {
  return {
    type: types.USER_RATING_FOOD_SUCCESS,
    payload,
  };
}

export function userRatingFoodFailed(payload) {
  return {
    type: types.USER_RATING_FOOD_FAILED,
    payload,
  };
}

export function getFoodById(payload) {
  return {
    type: types.GET_FOOD_BY_ID,
    payload,
  };
}

export function getFoodByIdSuccess(payload) {
  return {
    type: types.GET_FOOD_BY_ID_SUCCESS,
    payload,
  };
}

export function getFoodByIdFailed(payload) {
  return {
    type: types.GET_FOOD_BY_ID_FAILED,
    payload,
  };
}
