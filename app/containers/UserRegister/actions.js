/*
 *
 * UserRegister actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signUp(payload) {
  return {
    type: types.SIGN_UP,
    payload
  };
}

export function signUpSuccess(payload) {
  return {
    type: types.SIGN_UP_SUCCESS,
    payload
  };
}

export function signUpFailed(payload) {
  return {
    type: types.SIGN_UP_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}
