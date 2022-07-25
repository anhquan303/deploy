/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllStore(payload) {
  return {
    type: types.GET_ALL_STORE,
    payload
  };
}

export function getAllStoreSuccess(payload) {
  return {
    type: types.GET_ALL_STORE_SUCCESS,
    payload
  };
}

export function getAllStoreFailed(payload) {
  return {
    type: types.GET_ALL_STORE_FAILED,
    payload
  };
}

export function getAllUser(payload) {
  return {
    type: types.GET_ALL_USER,
    payload
  };
}

export function getAllUserSuccess(payload) {
  return {
    type: types.GET_ALL_USER_SUCCESS,
    payload
  };
}

export function getAllUserFailed(payload) {
  return {
    type: types.GET_ALL_USER_FAILED,
    payload
  };
}

export function getAllFood(payload) {
  return {
    type: types.GET_ALL_FOOD,
    payload
  };
}

export function getAllFoodSuccess(payload) {
  return {
    type: types.GET_ALL_FOOD_SUCCESS,
    payload
  };
}

export function getAllFoodFailed(payload) {
  return {
    type: types.GET_ALL_FOOD_FAILED,
    payload
  };
}


