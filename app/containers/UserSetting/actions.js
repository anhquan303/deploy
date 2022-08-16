/*
 *
 * UserSetting actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateUser(payload) {
  return {
    type: types.UPDATE_USER,
    payload,
  };
}

export function updateUserSuccess(payload) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    payload,
  };
}

export function updateUserFailed(payload) {
  return {
    type: types.UPDATE_USER_FAILED,
    payload,
  };
}

export function getUserById(payload) {
  return {
    type: types.GET_USER_BY_ID,
    payload,
  };
}

export function getUserByIdSuccess(payload) {
  return {
    type: types.GET_USER_BY_ID_SUCCESS,
    payload,
  };
}

export function getUserByIdFailed(payload) {
  return {
    type: types.GET_USER_BY_ID_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}

export function sendOTP(payload) {
  return {
    type: types.SEND_OTP,
    payload,
  };
}

export function sendOTPSuccess(payload) {
  return {
    type: types.SEND_OTP_SUCCESS,
    payload,
  };
}

export function sendOTPFailed(payload) {
  return {
    type: types.SEND_OTP_FAILED,
    payload,
  };
}

export function verifyPhoneee(payload) {
  return {
    type: types.VERIFY_PHONE,
    payload,
  };
}

export function verifyPhoneSuccess(payload) {
  return {
    type: types.VERIFY_PHONE_SUCCESS,
    payload,
  };
}

export function verifyPhoneFailed(payload) {
  return {
    type: types.VERIFY_PHONE_FAILED,
    payload,
  };
}

export function updatePhoneEmail(payload) {
  return {
    type: types.UPDATE_PHONE_EMAIL,
    payload,
  };
}

export function updatePhoneEmailSuccess(payload) {
  return {
    type: types.UPDATE_PHONE_EMAIL_SUCCESS,
    payload,
  };
}

export function updatePhoneEmailFailed(payload) {
  return {
    type: types.UPDATE_PHONE_EMAIL_FAILED,
    payload,
  };
}

export function verifyEmail(payload) {
  return {
    type: types.VERIFY_EMAIL,
    payload,
  };
}

export function verifyEmailSuccess(payload) {
  return {
    type: types.VERIFY_EMAIL_SUCCESS,
    payload,
  };
}

export function verifyEmailFailed(payload) {
  return {
    type: types.VERIFY_EMAIL_FAILED,
    payload,
  };
}

export function sendOTPEmail(payload) {
  return {
    type: types.SEND_OTP_EMAIL,
    payload,
  };
}

export function sendOTPEmailSuccess(payload) {
  return {
    type: types.SEND_OTP_EMAIL_SUCCESS,
    payload,
  };
}

export function sendOTPEmailFailed(payload) {
  return {
    type: types.SEND_OTP_EMAIL_FAILED,
    payload,
  };
}

export function updateEmail(payload) {
  return {
    type: types.UPDATE_EMAIL,
    payload,
  };
}

export function updateEmailSuccess(payload) {
  return {
    type: types.UPDATE_EMAIL_SUCCESS,
    payload,
  };
}

export function updateEmailFailed(payload) {
  return {
    type: types.UPDATE_EMAIL_FAILED,
    payload,
  };
}


