/*
 *
 * Payment actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createOrder(payload) {
  return {
    type: types.CREATE_ORDER,
    payload
  };
}

export function createOrderSuccess(payload) {
  return {
    type: types.CREATE_ORDER_SUCCESS,
    payload
  };
}

export function createOrderFailed(payload) {
  return {
    type: types.CREATE_ORDER_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function getListLocationByUserId(payload) {
  return {
    type: types.GET_LIST_LOCATION_BY_USER_ID,
    payload
  };
}

export function getListLocationByUserIdSuccess(payload) {
  return {
    type: types.GET_LIST_LOCATION_BY_USER_ID_SUCCESS,
    payload
  };
}

export function getListLocationByUserIdFailed(payload) {
  return {
    type: types.GET_LIST_LOCATION_BY_USER_ID_FAILED,
    payload
  };
}
