/*
 *
 * UserReport actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getListReportByUserId(payload) {
  return {
    type: types.GET_LIST_REPORT_BY_USER_ID,
    payload
  };
}

export function getListReportByUserIdSuccess(payload) {
  return {
    type: types.GET_LIST_REPORT_BY_USER_ID_SUCCESS,
    payload
  };
}

export function getListReportByUserIdFailed(payload) {
  return {
    type: types.GET_LIST_REPORT_BY_USER_ID_FAILED,
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



