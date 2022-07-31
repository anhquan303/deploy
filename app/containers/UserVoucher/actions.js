/*
 *
 * UserVoucher actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getListVoucherByUserId(payload) {
  return {
    type: types.GET_LIST_VOUCHER_BY_USER_ID,
    payload
  };
}

export function getListVoucherByUserIdSuccess(payload) {
  return {
    type: types.GET_LIST_VOUCHER_BY_USER_ID_SUCCESS,
    payload
  };
}

export function getListVoucherByUserIdFailed(payload) {
  return {
    type: types.GET_LIST_VOUCHER_BY_USER_ID_FAILED,
    payload
  };
}

export function userDeleteVoucherById(payload) {
  return {
    type: types.USER_DELETE_VOUCHER_ID,
    payload
  };
}

export function userDeleteVoucherByIdSuccess(payload) {
  return {
    type: types.USER_DELETE_VOUCHER_ID_SUCCESS,
    payload
  };
}

export function userDeleteVoucherByIdFailed(payload) {
  return {
    type: types.USER_DELETE_VOUCHER_ID_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}


