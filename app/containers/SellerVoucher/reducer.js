/*
 *
 * SellerVoucher reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  listVoucher: [],
  voucher: undefined
};

/* eslint-disable default-case, no-param-reassign */
const sellerVoucherReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.ADD_VOUCHER:
        draft.loading = true;
        break;
      case types.ADD_VOUCHER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_VOUCHER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_VOUCHER_BY_STORE_ID:
        draft.loading = true;
        break;
      case types.GET_VOUCHER_BY_STORE_ID_SUCCESS:
        draft.loading = false;
        draft.listVoucher = action.payload;
        break;
      case types.GET_VOUCHER_BY_STORE_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_VOUCHER_BY_ID:
        draft.loading = true;
        break;
      case types.GET_VOUCHER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.voucher = action.payload;
        break;
      case types.GET_VOUCHER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_VOUCHER_BY_ID:
        draft.loading = true;
        break;
      case types.UPDATE_VOUCHER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_VOUCHER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
      case types.DELETE_VOUCHER_BY_ID:
        draft.loading = true;
        break;
      case types.DELETE_VOUCHER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_VOUCHER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.INACTIVE_VOUCHER_BY_ID:
        draft.loading = true;
        break;
      case types.INACTIVE_VOUCHER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.INACTIVE_VOUCHER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ACTIVE_VOUCHER_BY_ID:
        draft.loading = true;
        break;
      case types.ACTIVE_VOUCHER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ACTIVE_VOUCHER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerVoucherReducer;
