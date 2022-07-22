/*
 *
 * UserDetailOrder actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrderDetailById(payload) {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID,
    payload,
  };
}

export function getOrderDetailByIdSuccess(payload) {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID_SUCCESS,
    payload,
  };
}

export function getOrderDetailByIdFailed(payload) {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID_FAILED,
    payload,
  };
}

export function cancelOrder(payload) {
  return {
    type: types.CANCEL_ORDER,
    payload,
  };
}

export function cancelOrderSuccess(payload) {
  return {
    type: types.CANCEL_ORDER_SUCCESS,
    payload,
  };
}

export function cancelOrderFailed(payload) {
  return {
    type: types.CANCEL_ORDER_FAILED,
    payload,
  };
}
