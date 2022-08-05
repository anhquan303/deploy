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
    payload,
  };
}

export function getOrderByStoreIdSuccess(payload) {
  return {
    type: types.GET_ORDER_BY_STORE_ID_SUCCESS,
    payload,
  };
}

export function getOrderByStoreIdFailed(payload) {
  return {
    type: types.GET_ORDER_BY_STORE_ID_FAILED,
    payload,
  };
}

export function getOrderByStatus(payload) {
  return {
    type: types.GET_ORDER_BY_STATUS_NEW,
    payload,
  };
}

export function getOrderByStatusSuccess(payload) {
  return {
    type: types.GET_ORDER_BY_STATUS_NEW_SUCCESS,
    payload,
  };
}

export function getOrderByStatusFailed(payload) {
  return {
    type: types.GET_ORDER_BY_STATUS_NEW_FAILED,
    payload,
  };
}

export function getOrderByStatusCancel(payload) {
  return {
    type: types.GET_ORDER_BY_STATUS_CANCEL,
    payload,
  };
}

export function getOrderByStatusCancelSuccess(payload) {
  return {
    type: types.GET_ORDER_BY_STATUS_CANCEL_SUCCESS,
    payload,
  };
}

export function getOrderByStatusCancelFailed(payload) {
  return {
    type: types.GET_ORDER_BY_STATUS_CANCEL_FAILED,
    payload,
  };
}

