/*
 *
 * SellerRegister actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sellerSignUp(payload) {
  return {
    type: types.SELLER_SIGNUP,
    payload,
  };
}

export function sellerSignUpSuccess(payload) {
  return {
    type: types.SELLER_SIGNUP_SUCCESS,
    payload,
  };
}

export function sellerSignUpFailed(payload) {
  return {
    type: types.SELLER_SIGNUP_FAILED,
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

export function getListBank(payload) {
  return {
    type: types.GET_LIST_BANK,
    payload,
  };
}

export function getListBankSuccess(payload) {
  return {
    type: types.GET_LIST_BANK_SUCCESS,
    payload,
  };
}

export function getListBankFailed(payload) {
  return {
    type: types.GET_LIST_BANK_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}
