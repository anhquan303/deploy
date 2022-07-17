/*
 *
 * DashboardCustomer actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchListUser(payload) {
  return {
    type: types.FETCH_LIST_USER,
    payload
  };
}

export function fetchListUserSuccess(payload) {
  return {
    type: types.FETCH_LIST_USER_SUCCESS,
    payload
  };
}

export function fetchListUserFailed(payload) {
  return {
    type: types.FETCH_LIST_USER_FAILED,
    payload
  };
}
