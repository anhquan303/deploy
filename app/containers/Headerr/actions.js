/*
 *
 * Headerr actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logOut(payload) {
  return {
    type: types.LOG_OUT,
    payload,
  };
}

export function logOutSuccess(payload) {
  return {
    type: types.LOG_OUT_SUCCESS,
    payload,
  };
}

export function logOutFailed(payload) {
  return {
    type: types.LOG_OUT_FAILED,
    payload,
  };
}

export function getCart(payload) {
  return {
    type: types.GET_CART,
    payload,
  };
}

export function getCartSuccess(payload) {
  return {
    type: types.GET_CART_SUCCESS,
    payload,
  };
}

export function getCartFailed(payload) {
  return {
    type: types.GET_CART_FAILED,
    payload,
  };
}

