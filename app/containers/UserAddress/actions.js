/*
 *
 * UserAddress actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllLocation(payload) {
  return {
    type: types.GET_ALL_LOCATION,
    payload
  };
}

export function getAllLocationSuccess(payload) {
  return {
    type: types.GET_ALL_LOCATION_SUCCESS,
    payload
  };
}

export function getAllLocationFailed(payload) {
  return {
    type: types.GET_ALL_LOCATION_FAILED,
    payload
  };
}

export function getListWards(payload) {
  return {
    type: types.GET_LIST_WARDS,
    payload
  };
}

export function getListWardsSuccess(payload) {
  return {
    type: types.GET_LIST_WARDS_SUCCESS,
    payload
  };
}

export function getListWardsFailed(payload) {
  return {
    type: types.GET_LIST_WARDS_FAILED,
    payload
  };
}

export function addLocation(payload) {
  return {
    type: types.ADD_LOCATION,
    payload
  };
}

export function addLocationSuccess(payload) {
  return {
    type: types.ADD_LOCATION_SUCCESS,
    payload
  };
}

export function addLocationFailed(payload) {
  return {
    type: types.ADD_LOCATION_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}

export function getLocationById(payload) {
  return {
    type: types.GET_LOCATION_BY_ID,
    payload
  };
}

export function getLocationByIdSuccess(payload) {
  return {
    type: types.GET_LOCATION_BY_ID_SUCCESS,
    payload
  };
}

export function getLocationByIdFailed(payload) {
  return {
    type: types.GET_LOCATION_BY_ID_FAILED,
    payload
  };
}

export function updateLocation(payload) {
  return {
    type: types.UPDATE_LOCATION,
    payload
  };
}

export function updateLocationSuccess(payload) {
  return {
    type: types.UPDATE_LOCATION_SUCCESS,
    payload
  };
}

export function updateLocationFailed(payload) {
  return {
    type: types.UPDATE_LOCATION_FAILED,
    payload
  };
}

export function deleteLocation(payload) {
  return {
    type: types.DELETE_LOCATION,
    payload
  };
}

export function deleteLocationSuccess(payload) {
  return {
    type: types.DELETE_LOCATION_SUCCESS,
    payload
  };
}

export function deleteLocationFailed(payload) {
  return {
    type: types.DELETE_LOCATION_FAILED,
    payload
  };
}



