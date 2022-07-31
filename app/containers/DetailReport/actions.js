/*
 *
 * DetailReport actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getReportById(payload) {
  return {
    type: types.GET_REPORT_BY_ID,
    payload
  };
}

export function getReportByIdSuccess(payload) {
  return {
    type: types.GET_REPORT_BY_ID_SUCCESS,
    payload
  };
}

export function getReportByIdFailed(payload) {
  return {
    type: types.GET_REPORT_BY_ID_FAILED,
    payload
  };
}

export function sendReply(payload) {
  return {
    type: types.SEND_REPLY,
    payload
  };
}

export function sendReplySuccess(payload) {
  return {
    type: types.SEND_REPLY_SUCCESS,
    payload
  };
}

export function sendReplyFailed(payload) {
  return {
    type: types.SEND_REPLY_FAILED,
    payload
  };
}

