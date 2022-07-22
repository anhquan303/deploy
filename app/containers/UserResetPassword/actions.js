/*
 *
 * UserResetPassword actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function resetPassword(payload) {
  return {
    type: types.RESET_PASSWORD,
    payload,
  };
}

export function resetPasswordSuccess(payload) {
  return {
    type: types.RESET_PASSWORD_SUCCESS,
    payload,
  };
}

export function resetPasswordFailed(payload) {
  return {
    type: types.RESET_PASSWORD_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}
