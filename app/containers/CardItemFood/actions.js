/*
 *
 * CardItemFood actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addToCart(payload) {
  return {
    type: types.ADD_TO_CART,
    payload
  };
}

export function addToCartSuccess(payload) {
  return {
    type: types.ADD_TO_CART_SUCCESS,
    payload
  };
}

export function addToCartFailed(payload) {
  return {
    type: types.ADD_TO_CART_FAILED,
    payload
  };
}