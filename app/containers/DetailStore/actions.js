/*
 *
 * DetailStore actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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
    type: types.APPROVED_STORE_SUCCESS,
    payload
  };
}

export function getStoreById(payload) {
  return {
    type: types.GET_STORE_BY_ID,
    payload
  };
}

export function getStoreByIdSuccess(payload) {
  return {
    type: types.GET_STORE_BY_ID_SUCCESS,
    payload
  };
}

export function getStoreByIdFailed(payload) {
  return {
    type: types.GET_STORE_BY_ID_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

