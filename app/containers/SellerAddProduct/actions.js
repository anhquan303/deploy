/*
 *
 * SellerAddProduct actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addProduct(payload) {
  return {
    type: types.ADD_PRODUCT,
    payload,
  };
}

export function addProductSuccess(payload) {
  return {
    type: types.ADD_PRODUCT_SUCCESS,
    payload,
  };
}

export function addProductFailed(payload) {
  return {
    type: types.ADD_PRODUCT_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}
