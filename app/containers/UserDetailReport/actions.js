/*
 *
 * UserDetailReport actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDetailReportById(payload) {
  return {
    type: types.GET_DETAIL_REPORT_BY_ID,
    payload
  };
}

export function getDetailReportByIdSuccess(payload) {
  return {
    type: types.GET_DETAIL_REPORT_BY_ID_SUCCESS,
    payload
  };
}

export function getDetailReportByIdFailed(payload) {
  return {
    type: types.GET_DETAIL_REPORT_BY_ID_FAILD,
    payload
  };
}

