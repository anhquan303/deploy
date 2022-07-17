/*
 *
 * UserHomePage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logOut(payload) {
  return {
    type: types.LOG_OUT,
    payload,
  };
}

export function logOutSuccess(payload) {
  return {
    type: types.LOG_OUT_SUCCESS,
    payload,
  };
}

export function logOutFailed(payload) {
  return {
    type: types.LOG_OUT_FAILED,
    payload,
  };
}

export function fetchListFood(payload) {
  return {
    type: types.FETCH_LIST_FOOD,
    payload,
  };
}

export function fetchListFoodSuccess(payload) {
  return {
    type: types.FETCH_LIST_FOOD_SUCCESS,
    payload,
  };
}

export function fetchListFoodFailed(payload) {
  return {
    type: types.FETCH_LIST_FOOD_FAILED,
    payload,
  };
}

