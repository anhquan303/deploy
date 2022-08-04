/*
 *
 * SellerSetting actions
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
    payload,
  };
}

export function getStoreByIdSuccess(payload) {
  return {
    type: types.GET_STORE_BY_ID_SUCCESS,
    payload,
  };
}

export function getStoreByIdFailed(payload) {
  return {
    type: types.GET_STORE_BY_ID_FAILED,
    payload,
  };
}

export function getListWards(payload) {
  return {
    type: types.GET_LIST_WARDS,
    payload,
  };
}

export function getListWardsSuccess(payload) {
  return {
    type: types.GET_LIST_WARDS_SUCCESS,
    payload,
  };
}

export function getListWardsFailed(payload) {
  return {
    type: types.GET_LIST_WARDS_FAILED,
    payload,
  };
}

export function updateStore(payload) {
  return {
    type: types.UPDATE_STORE,
    payload,
  };
}

export function updateStoreSuccess(payload) {
  return {
    type: types.UPDATE_STORE_SUCCESS,
    payload,
  };
}

export function updateStoreFailed(payload) {
  return {
    type: types.UPDATE_STORE_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}
