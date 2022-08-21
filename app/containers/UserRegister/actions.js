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
    payload,
  };
}

export function signUpSuccess(payload) {
  return {
    type: types.SIGN_UP_SUCCESS,
    payload,
  };
}

export function signUpFailed(payload) {
  return {
    type: types.SIGN_UP_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}

// export function sendSMS(payload) {
//   return {
//     type: types.SEND_SMS,
//     payload,
//   };
// }

// export function sendSMSSuccess(payload) {
//   return {
//     type: types.SEND_SMS_SUCCESS,
//     payload,
//   };
// }

// export function sendSMSFailed(payload) {
//   return {
//     type: types.SEND_SMS_FAILED,
//     payload,
//   };
// }

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

