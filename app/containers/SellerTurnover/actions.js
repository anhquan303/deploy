/*
 *
 * SellerTurnover actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDataForChart(payload) {
  return {
    type: types.GET_DATA_FOR_CHART,
    payload
  };
}

export function getDataForChartSuccess(payload) {
  return {
    type: types.GET_DATA_FOR_CHART_SUCCESS,
    payload
  };
}

export function getDataForChartFailed(payload) {
  return {
    type: types.GET_DATA_FOR_CHART_FAILED,
    payload
  };
}

