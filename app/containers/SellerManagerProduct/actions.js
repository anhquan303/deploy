/*
 *
 * SellerManagerProduct actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchListFood(payload) {
  return {
    type: types.FETCH_LIST_FOOD,
    payload
  };
}

export function fetchListFoodSuccess(payload) {
  return {
    type: types.FETCH_LIST_FOOD_SUCCESS,
    payload
  };
}

export function fetchListFoodFailed(payload) {
  return {
    type: types.FETCH_LIST_FOOD_FAILED,
    payload
  };
}

export function searchFood(payload) {
  return {
    type: types.SEARCH_FOOD,
    payload
  };
}

export function searchFoodSuccess(payload) {
  return {
    type: types.SEARCH_FOOD_SUCCESS,
    payload
  };
}

export function searchFoodFailed(payload) {
  return {
    type: types.SEARCH_FOOD_FAILED,
    payload
  };
}
