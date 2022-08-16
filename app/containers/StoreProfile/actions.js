/*
 *
 * StoreProfile actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStoreById(payload) {
  return {
    type: types.GET_STORE_BY_ID,
    payload
  };
}

export function getStoreByIdSuccess(payload) {
  return {
    type: types.GET_STORE_BY_ID_SUCCESS,
    payload
  };
}

export function getStoreByIdFailed(payload) {
  return {
    type: types.GET_STORE_BY_ID_FAILED,
    payload
  };
}

export function getFoodByStoreId(payload) {
  return {
    type: types.GET_FOOD_BY_STORE_ID,
    payload
  };
}

export function getFoodByStoreIdSuccess(payload) {
  return {
    type: types.GET_FOOD_BY_STORE_ID_SUCCESS,
    payload
  };
}

export function getFoodByStoreIdFailed(payload) {
  return {
    type: types.GET_FOOD_BY_STORE_ID_FAILED,
    payload
  };
}

export function getStoreRating(payload) {
  return {
    type: types.GET_STORE_RATING,
    payload
  };
}

export function getStoreRatingSuccess(payload) {
  return {
    type: types.GET_STORE_RATING_SUCCESS,
    payload
  };
}

export function getStoreRatingFailed(payload) {
  return {
    type: types.GET_STORE_RATING_FAILED,
    payload
  };
}

export function getVoucherByStoreId(payload) {
  return {
    type: types.GET_VOUCHER_BY_STORE_ID,
    payload
  };
}

export function getVoucherByStoreIdSuccess(payload) {
  return {
    type: types.GET_VOUCHER_BY_STORE_ID_SUCCESS,
    payload
  };
}

export function getVoucherByStoreIdFailed(payload) {
  return {
    type: types.GET_VOUCHER_BY_STORE_ID_FAILED,
    payload
  };
}

export function addVoucherByUserId(payload) {
  return {
    type: types.ADD_VOUCHER_BY_USER_ID,
    payload
  };
}

export function addVoucherByUserIdSuccess(payload) {
  return {
    type: types.ADD_VOUCHER_BY_USER_ID_SUCCESS,
    payload
  };
}

export function addVoucherByUserIdFailed(payload) {
  return {
    type: types.ADD_VOUCHER_BY_USER_ID_FAILED,
    payload
  };
}

export function userAddReport(payload) {
  return {
    type: types.USER_ADD_REPORT,
    payload
  };
}

export function userAddReportSuccess(payload) {
  return {
    type: types.USER_ADD_REPORT_SUCCESS,
    payload
  };
}

export function userAddReportFailed(payload) {
  return {
    type: types.USER_ADD_REPORT_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function getStoreComment(payload) {
  return {
    type: types.GET_STORE_COMMENT,
    payload
  };
}

export function getStoreCommentSuccess(payload) {
  return {
    type: types.GET_STORE_COMMENT_SUCCESS,
    payload
  };
}

export function getStoreCommentFailed(payload) {
  return {
    type: types.GET_STORE_COMMENT_FAILED,
    payload
  };
}

export function getAllOrderByStoreId(payload) {
  return {
    type: types.GET_ALL_ORDER_STORE_ID,
    payload
  };
}

export function getAllOrderByStoreIdSuccess(payload) {
  return {
    type: types.GET_ALL_ORDER_STORE_ID_SUCCESS,
    payload
  };
}

export function getAllOrderByStoreIdFailed(payload) {
  return {
    type: types.GET_ALL_ORDER_STORE_ID_FAILED,
    payload
  };
}