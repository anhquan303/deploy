/*
 *
 * Dashboard actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getData(payload) {
  return {
    type: types.GET_DATA,
    payload
  };
}

export function getDataSuccess(payload) {
  return {
    type: types.GET_DATA_SUCCESS,
    payload
  };
}

export function getDataFailed(payload) {
  return {
    type: types.GET_DATA_FAILED,
    payload
  };
}
