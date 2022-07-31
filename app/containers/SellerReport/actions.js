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

