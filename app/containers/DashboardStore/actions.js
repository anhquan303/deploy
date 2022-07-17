/*
 *
 * DashboardStore actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllStore(payload) {
  return {
    type: types.GET_ALL_STORE,
    payload
  };
}

export function getAllStoreSuccess(payload) {
  return {
    type: types.GET_ALL_STORE_SUCCESS,
    payload
  };
}

export function getAllStoreFailed(payload) {
  return {
    type: types.GET_ALL_STORE_FAILED,
    payload
  };
}
