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

export function getListWards(payload) {
  return {
    type: types.GET_LIST_WARDS,
    payload
  };
}

export function getListWardsSuccess(payload) {
  return {
    type: types.GET_LIST_WARDS_SUCCESS,
    payload
  };
}

export function getListWardsFailed(payload) {
  return {
    type: types.GET_LIST_WARDS_FAILED,
    payload
  };
}

export function addLocation(payload) {
  return {
    type: types.ADD_LOCATION,
    payload
  };
}

export function addLocationSuccess(payload) {
  return {
    type: types.ADD_LOCATION_SUCCESS,
    payload
  };
}

export function addLocationFailed(payload) {
  return {
    type: types.ADD_LOCATION_FAILED,
    payload
  };
}

export function createQR(payload) {
  return {
    type: types.CREATE_QR,
    payload
  };
}

export function createQRSuccess(payload) {
  return {
    type: types.CREATE_QR_SUCCESS,
    payload
  };
}

export function createQRFailed(payload) {
  return {
    type: types.CREATE_QR_FAILED,
    payload
  };
}

export function getListOrderByUserId(payload) {
  return {
    type: types.GET_LIST_ORDER_BY_USER_ID,
    payload
  };
}

export function getListOrderByUserIdSuccess(payload) {
  return {
    type: types.GET_LIST_ORDER_BY_USER_ID_SUCCESS,
    payload
  };
}

export function getListOrderByUserIdFailed(payload) {
  return {
    type: types.GET_LIST_ORDER_BY_USER_ID_FAILED,
    payload
  };
}