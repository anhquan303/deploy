/*
 *
 * UserChangePassword actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changePassword(payload) {
  return {
    type: types.CHANGE_PASSWORD,
    payload
  };
}

export function changePasswordSuccess(payload) {
  return {
    type: types.CHANGE_PASSWORD_SUCCESS,
    payload
  };
}


export function changePasswordFailed(payload) {
  return {
    type: types.CHANGE_PASSWORD_FAILED,
    payload
  };
}


export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function logout(payload) {
  return {
    type: types.LOG_OUT,
    payload
  };
}

export function logoutSuccess(payload) {
  return {
    type: types.LOG_OUT_SUCCESS,
    payload
  };
}

export function logoutFailed(payload) {
  return {
    type: types.LOG_OUT_FAILED,
    payload
  };
}


