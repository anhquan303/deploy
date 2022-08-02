/*
 *
 * Cart actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function getOrderCart(payload) {
  return {
    type: types.GET_ORDER,
    payload,
  };
}

export function getOrderCartSuccess(payload) {
  return {
    type: types.GET_ORDER_SUCCESS,
    payload,
  };
}

export function getOrderCartFailed(payload) {
  return {
    type: types.GET_ORDER_FAILED,
    payload,
  };
}

//
export function addQuantityFood(payload) {
  return {
    type: types.ADD_QUANTITY_FOOD,
    payload,
  };
}

export function addQuantityFoodSuccess(payload) {
  return {
    type: types.ADD_QUANTITY_FOOD_SUCCESS,
    payload,
  };
}

export function addQuantityFoodFailed(payload) {
  return {
    type: types.ADD_QUANTITY_FOOD_FAILED,
    payload,
  };
}

//
export function subQuantityFood(payload) {
  return {
    type: types.SUB_QUANTITY_FOOD,
    payload,
  };
}

export function subQuantityFoodSuccess(payload) {
  return {
    type: types.SUB_QUANTITY_FOOD_SUCCESS,
    payload,
  };
}

export function subQuantityFoodFailed(payload) {
  return {
    type: types.SUB_QUANTITY_FOOD_FAILED,
    payload,
  };
}
//
export function deleteQuantityFood(payload) {
  return {
    type: types.DELETE_FOOD,
    payload,
  };
}

export function deleteQuantityFoodSuccess(payload) {
  return {
    type: types.DELETE_FOOD_SUCCESS,
    payload,
  };
}

export function deleteQuantityFoodFailed(payload) {
  return {
    type: types.DELETE_FOOD_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}

export function deleteFood(payload) {
  return {
    type: types.DELETE_FOOD,
    payload,
  };
}

export function deleteFoodSuccess(payload) {
  return {
    type: types.DELETE_FOOD_SUCCESS,
    payload,
  };
}

export function deleteFoodFailed(payload) {
  return {
    type: types.DELETE_FOOD_FAILED,
    payload,
  };
}

export function deleteAllCart(payload) {
  return {
    type: types.DELETE_ALL_CART,
    payload,
  };
}

export function deleteAllCartSuccess(payload) {
  return {
    type: types.DELETE_ALL_CART_SUCCESS,
    payload,
  };
}

export function deleteAllCartFailed(payload) {
  return {
    type: types.DELETE_ALL_CART_FAILED,
    payload,
  };
}

export function getVoucher(payload) {
  return {
    type: types.GET_VOUCHER,
    payload,
  };
}

export function getVoucherSuccess(payload) {
  return {
    type: types.GET_VOUCHER_SUCCESS,
    payload,
  };
}

export function getVoucherFailed(payload) {
  return {
    type: types.GET_VOUCHER_FAILED,
    payload,
  };
}

