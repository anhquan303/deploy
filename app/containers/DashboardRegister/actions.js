/*
 *
 * DashboardRegister actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchListRegister(payload) {
  return {
    type: types.FETCH_LIST_REGISTER,
    payload
  };
}

export function fetchListRegisterSuccess(payload) {
  return {
    type: types.FETCH_LIST_REGISTER_SUCCESS,
    payload
  };
}

export function fetchListRegisterFailed(payload) {
  return {
    type: types.FETCH_LIST_REGISTER_FAILED,
    payload
  };
}





