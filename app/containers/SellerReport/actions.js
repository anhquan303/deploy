/*
 *
 * SellerReport actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getReportByStoreId(payload) {
  return {
    type: types.GET_REPORT_BY_STORE_ID,
    payload
  };
}

export function getReportByStoreIdSuccess(payload) {
  return {
    type: types.GET_REPORT_BY_STORE_ID_SUCCESS,
    payload
  };
}

export function getReportByStoreIdFailed(payload) {
  return {
    type: types.GET_REPORT_BY_STORE_ID_FAILED,
    payload
  };
}

export function storeAddReport(payload) {
  return {
    type: types.STORE_ADD_REPORT,
    payload
  };
}

export function storeAddReportSuccess(payload) {
  return {
    type: types.STORE_ADD_REPORT_SUCCESS,
    payload
  };
}

export function storeAddReportFailed(payload) {
  return {
    type: types.STORE_ADD_REPORT_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}



