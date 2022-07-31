/*
 *
 * SellerVoucher actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addVoucher(payload) {
  return {
    type: types.ADD_VOUCHER,
    payload
  };
}

export function addVoucherSuccess(payload) {
  return {
    type: types.ADD_VOUCHER_SUCCESS,
    payload
  };
}

export function addVoucherFailed(payload) {
  return {
    type: types.ADD_VOUCHER_FAILED,
    payload
  };
}

export function getVoucherByStoreId(payload) {
  return {
    type: types.GET_VOUCHER_BY_STORE_ID,
    payload
  };
}

export function getVoucherByStoreIdSuccess(payload) {
  return {
    type: types.GET_VOUCHER_BY_STORE_ID_SUCCESS,
    payload
  };
}

export function getVoucherByStoreIdFailed(payload) {
  return {
    type: types.GET_VOUCHER_BY_STORE_ID_FAILED,
    payload
  };
}

export function getVoucherById(payload) {
  return {
    type: types.GET_VOUCHER_BY_ID,
    payload
  };
}

export function getVoucherByIdSuccess(payload) {
  return {
    type: types.GET_VOUCHER_BY_ID_SUCCESS,
    payload
  };
}

export function getVoucherByIdFailed(payload) {
  return {
    type: types.GET_VOUCHER_BY_ID_FAILED,
    payload
  };
}

export function updateVoucherById(payload) {
  return {
    type: types.UPDATE_VOUCHER_BY_ID,
    payload
  };
}

export function updateVoucherByIdSuccess(payload) {
  return {
    type: types.UPDATE_VOUCHER_BY_ID_SUCCESS,
    payload
  };
}

export function updateVoucherByIdFailed(payload) {
  return {
    type: types.UPDATE_VOUCHER_BY_ID_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function deleteVoucher(payload) {
  return {
    type: types.DELETE_VOUCHER_BY_ID,
    payload
  };
}

export function deleteVoucherSuccess(payload) {
  return {
    type: types.DELETE_VOUCHER_BY_ID_SUCCESS,
    payload
  };
}

export function deleteVoucherFailed(payload) {
  return {
    type: types.DELETE_VOUCHER_BY_ID_FAILED,
    payload
  };
}

export function inActiveVoucherById(payload) {
  return {
    type: types.INACTIVE_VOUCHER_BY_ID,
    payload
  };
}

export function inActiveVoucherByIdSuccess(payload) {
  return {
    type: types.INACTIVE_VOUCHER_BY_ID_SUCCESS,
    payload
  };
}

export function inActiveVoucherByIdFailed(payload) {
  return {
    type: types.INACTIVE_VOUCHER_BY_ID_FAILED,
    payload
  };
}

export function activeVoucherById(payload) {
  return {
    type: types.ACTIVE_VOUCHER_BY_ID,
    payload
  };
}

export function activeVoucherByIdSuccess(payload) {
  return {
    type: types.ACTIVE_VOUCHER_BY_ID_SUCCESS,
    payload
  };
}

export function activeVoucherByIdFailed(payload) {
  return {
    type: types.ACTIVE_VOUCHER_BY_ID_FAILED,
    payload
  };
}


