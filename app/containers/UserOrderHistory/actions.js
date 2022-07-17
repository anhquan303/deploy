/*
 *
 * UserOrderHistory actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrderById(payload) {
  return {
    type: types.GET_ORDER_BY_USER_ID,
    payload
  };
}

export function getOrderByIdSuccess(payload) {
  return {
    type: types.GET_ORDER_BY_USER_ID_SUCCESS,
    payload
  };
}

export function getOrderByIdFailed(payload) {
  return {
    type: types.GET_ORDER_BY_USER_ID_FAILED,
    payload
  };
}
