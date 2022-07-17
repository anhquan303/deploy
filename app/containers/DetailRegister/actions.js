/*
 *
 * DetailRegister actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function approvedStore(payload) {
  return {
    type: types.APPROVED_STORE,
    payload
  };
}

export function approvedStoreSuccess(payload) {
  return {
    type: types.APPROVED_STORE_SUCCESS,
    payload
  };
}

export function approvedStoreFailed(payload) {
  return {
    type: types.APPROVED_STORE_FAILED,
    payload
  };
}

export function declinedStore(payload) {
  return {
    type: types.DECLINED_STORE,
    payload
  };
}

export function declinedStoreSuccess(payload) {
  return {
    type: types.DECLINED_STORE_SUCCESS,
    payload
  };
}

export function declinedStoreFailed(payload) {
  return {
    type: types.DECLINED_STORE_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function getRegisterById(payload) {
  return {
    type: types.GET_REGISTER_BY_ID,
    payload
  };
}

export function getRegisterByIdSuccess(payload) {
  return {
    type: types.GET_REGISTER_BY_ID_SUCCESS,
    payload
  };
}

export function getRegisterByIdFailed(payload) {
  return {
    type: types.GET_REGISTER_BY_ID_FAILED,
    payload
  };
}


