/*
 *
 * DashboardReport actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllReport(payload) {
  return {
    type: types.GET_ALL_REPORT,
    payload
  };
}

export function getAllReportSuccess(payload) {
  return {
    type: types.GET_ALL_REPORT_SUCCESS,
    payload
  };
}

export function getAllReportFailed(payload) {
  return {
    type: types.GET_ALL_REPORT_FAILED,
    payload
  };
}


