/*
 *
 * SellerActionProduct actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function deleteProduct(payload) {
  return {
    type: types.DELETE_PRODUCT,
    payload
  };
}

export function deleteProductSuccess(payload) {
  return {
    type: types.DELETE_PRODUCT_SUCCESS,
    payload
  };
}

export function deleteProductFailed(payload) {
  return {
    type: types.DELETE_PRODUCT_FAILED,
    payload
  };
}

export function updateProduct(payload) {
  return {
    type: types.UPDATE_PRODUCT,
    payload
  };
}

export function updateProductSuccess(payload) {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS,
    payload
  };
}

export function updateProductFailed(payload) {
  return {
    type: types.UPDATE_PRODUCT_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function getProductById(payload) {
  return {
    type: types.GET_PRODUCT_BY_ID,
    payload
  };
}

export function getProductByIdSuccess(payload) {
  return {
    type: types.GET_PRODUCT_BY_ID_SUCCESS,
    payload
  };
}

export function getProductByIdFailed(payload) {
  return {
    type: types.GET_PRODUCT_BY_ID_FAILED,
    payload
  };
}

export function activeProduct(payload) {
  return {
    type: types.ACTIVE_PRODUCT,
    payload
  };
}

export function activeProductSuccess(payload) {
  return {
    type: types.ACTIVE_PRODUCT_SUCCESS,
    payload
  };
}

export function activeProductFailed(payload) {
  return {
    type: types.ACTIVE_PRODUCT_FAILED,
    payload
  };
}

export function deactiveProduct(payload) {
  return {
    type: types.DEACTIVE_PRODUCT,
    payload
  };
}

export function deactiveProductSuccess(payload) {
  return {
    type: types.DEACTIVE_PRODUCT_SUCCESS,
    payload
  };
}

export function deactiveProductFailed(payload) {
  return {
    type: types.DEACTIVE_PRODUCT_FAILED,
    payload
  };
}