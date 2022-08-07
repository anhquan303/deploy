/*
 *
 * Payment reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  listLocation: [],
  listWard: [],
  qrcode: "",
  listOrder: [],
  listVoucher: [],
  defaultLocation: undefined
};

/* eslint-disable default-case, no-param-reassign */
const paymentReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.CREATE_ORDER:
        draft.loading = true;
        break;
      case types.CREATE_ORDER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CREATE_ORDER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LIST_LOCATION_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_LIST_LOCATION_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.listLocation = action.payload;
        break;
      case types.GET_LIST_LOCATION_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        draft.qrcode = "";
        break;
      case types.GET_LIST_WARDS:
        draft.loading = true;
        break;
      case types.GET_LIST_WARDS_SUCCESS:
        draft.loading = false;
        draft.listWard = action.payload;
        break;
      case types.GET_LIST_WARDS_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_LOCATION:
        draft.loading = true;
        break;
      case types.ADD_LOCATION_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_LOCATION_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CREATE_QR:
        draft.loading = true;
        break;
      case types.CREATE_QR_SUCCESS:
        draft.loading = false;
        draft.qrcode = action.payload;
        break;
      case types.CREATE_QR_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LIST_ORDER_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_LIST_ORDER_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.listOrder = action.payload;
        break;
      case types.GET_LIST_ORDER_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LIST_VOUCHER:
        draft.loading = true;
        break;
      case types.GET_LIST_VOUCHER_SUCCESS:
        draft.loading = false;
        draft.listVoucher = action.payload;
        break;
      case types.GET_LIST_VOUCHER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_DEFAULT_LOCATION:
        draft.loading = true;
        break;
      case types.GET_DEFAULT_LOCATION_SUCCESS:
        draft.loading = false;
        draft.defaultLocation = action.payload;
        break;
      case types.GET_DEFAULT_LOCATION_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default paymentReducer;
