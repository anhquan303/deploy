/*
 *
 * StoreProfile actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStoreById(payload) {
  return {
    type: types.GET_STORE_BY_ID,
    payload
  };
}

export function getStoreByIdSuccess(payload) {
  return {
    type: types.GET_STORE_BY_ID_SUCCESS,
    payload
  };
}

export function getStoreByIdFailed(payload) {
  return {
    type: types.GET_STORE_BY_ID_FAILED,
    payload
  };
}

export function getFoodByStoreId(payload) {
  return {
    type: types.GET_FOOD_BY_STORE_ID,
    payload
  };
}

export function getFoodByStoreIdSuccess(payload) {
  return {
    type: types.GET_FOOD_BY_STORE_ID_SUCCESS,
    payload
  };
}

export function getFoodByStoreIdFailed(payload) {
  return {
    type: types.GET_FOOD_BY_STORE_ID_FAILED,
    payload
  };
}

export function getStoreRating(payload) {
  return {
    type: types.GET_STORE_RATING,
    payload
  };
}

export function getStoreRatingSuccess(payload) {
  return {
    type: types.GET_STORE_RATING_SUCCESS,
    payload
  };
}

export function getStoreRatingFailed(payload) {
  return {
    type: types.GET_STORE_RATING_FAILED,
    payload
  };
}