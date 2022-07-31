/*
 *
 * SellerOrderDetail actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrderDetailById(payload) {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID,
    payload,
  };
}

export function getOrderDetailByIdSuccess(payload) {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID_SUCCESS,
    payload,
  };
}

export function getOrderDetailByIdFailed(payload) {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID_FAILED,
    payload,
  };
}

export function changeStatusToOrder(payload) {
  return {
    type: types.CHANGE_STATUS_TO_ORDER,
    payload,
  };
}

export function changeStatusToOrderSuccess(payload) {
  return {
    type: types.CHANGE_STATUS_TO_ORDER_SUCCESS,
    payload,
  };
}

export function changeStatusToOrderFailed(payload) {
  return {
    type: types.CHANGE_STATUS_TO_ORDER_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}

export function changeStatusToPaid(payload) {
  return {
    type: types.CHANGE_STATUS_TO_PAID,
    payload,
  };
}

export function changeStatusToPaidSuccess(payload) {
  return {
    type: types.CHANGE_STATUS_TO_PAID_SUCCESS,
    payload,
  };
}

export function changeStatusToPaidFailed(payload) {
  return {
    type: types.CHANGE_STATUS_TO_PAID_FAILED,
    payload,
  };
}

export function changeStatusToDelivery(payload) {
  return {
    type: types.CHANGE_STATUS_TO_DELIVERY,
    payload,
  };
}

export function changeStatusToDeliverySuccess(payload) {
  return {
    type: types.CHANGE_STATUS_TO_DELIVERY_SUCCESS,
    payload,
  };
}

export function changeStatusToDeliveryFailed(payload) {
  return {
    type: types.CHANGE_STATUS_TO_DELIVERY_FAILED,
    payload,
  };
}

export function changeStatusToDelivered(payload) {
  return {
    type: types.CHANGE_STATUS_TO_DELIVERED,
    payload,
  };
}

export function changeStatusToDeliveredSuccess(payload) {
  return {
    type: types.CHANGE_STATUS_TO_DELIVERED_SUCCESS,
    payload,
  };
}

export function changeStatusToDeliveredFailed(payload) {
  return {
    type: types.CHANGE_STATUS_TO_DELIVERED_FAILED,
    payload,
  };
}