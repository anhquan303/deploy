/*
 *
 * DetailCustomer actions
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

export function declinedUser(payload) {
  return {
    type: types.DECLINED_USER,
    payload
  };
}

export function declinedUserSuccess(payload) {
  return {
    type: types.DECLINED_USER_SUCCESS,
    payload
  };
}

export function declinedUserFailed(payload) {
  return {
    type: types.DECLINED_USER_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function approvedUser(payload) {
  return {
    type: types.APPROVED_USER,
    payload
  };
}

export function approvedUserSuccess(payload) {
  return {
    type: types.APPROVED_USER_SUCCESS,
    payload
  };
}

export function approvedUserFailed(payload) {
  return {
    type: types.APPROVED_USER_FAILED,
    payload
  };
}

export function getOrderByUserId(payload) {
  return {
    type: types.GET_ORDER_BY_USER_ID,
    payload
  };
}

export function getOrderByUserIdSuccess(payload) {
  return {
    type: types.GET_ORDER_BY_USER_ID_SUCCESS,
    payload
  };
}

export function getOrderByUserIdFailed(payload) {
  return {
    type: types.GET_ORDER_BY_USER_ID_FAILED,
    payload
  };
}

export function getLocation(payload) {
  return {
    type: types.GET_LOCATION,
    payload
  };
}

export function getLocationSuccess(payload) {
  return {
    type: types.GET_LOCATION_SUCCESS,
    payload
  };
}

export function getLocationFailed(payload) {
  return {
    type: types.GET_LOCATION_FAILED,
    payload
  };
}


