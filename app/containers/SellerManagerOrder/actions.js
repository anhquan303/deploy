/*
 *
 * SellerManagerOrder actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrderByStoreId(payload) {
  return {
    type: types.GET_ORDER_BY_STORE_ID,
    payload
  };
}

export function getOrderByStoreIdSuccess(payload) {
  return {
    type: types.GET_ORDER_BY_STORE_ID_SUCCESS,
    payload
  };
}

export function getOrderByStoreIdFailed(payload) {
  return {
    type: types.GET_ORDER_BY_STORE_ID_FAILED,
    payload
  };
}
