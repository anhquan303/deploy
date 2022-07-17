/*
 *
 * UserForgetPassword actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function forgetPassword(payload) {
  return {
    type: types.FORGET_PASSWORD,
    payload
  };
}

export function forgetPasswordSuccess(payload) {
  return {
    type: types.FORGET_PASSWORD_SUCCESS,
    payload
  };
}

export function forgetPasswordFailed(payload) {
  return {
    type: types.FORGET_PASSWORD_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}


