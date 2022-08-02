/*
 *
 * SellerHomePage actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUserById(payload) {
  return {
    type: types.GET_USER_BY_ID,
    payload
  };
}

export function getUserByIdSuccess(payload) {
  return {
    type: types.GET_USER_BY_ID_SUCCESS,
    payload
  };
}

export function getUserByIdFailed(payload) {
  return {
    type: types.GET_USER_BY_ID_FAILED,
    payload
  };
}

