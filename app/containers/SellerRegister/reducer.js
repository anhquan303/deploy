/*
 *
 * SellerRegister reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
  listWard: [],
  listBank: [],
  bankAccountName: ""
};

/* eslint-disable default-case, no-param-reassign */
const sellerRegisterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.SELLER_SIGNUP:
        draft.loading = true;
        break;
      case types.SELLER_SIGNUP_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SELLER_SIGNUP_FAILED:
        draft.loading = false;
        draft.message = action.payload;
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
      case types.GET_LIST_BANK:
        draft.loading = true;
        break;
      case types.GET_LIST_BANK_SUCCESS:
        draft.loading = false;
        draft.listBank = action.payload;
        break;
      case types.GET_LIST_BANK_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = '';
        draft.bankAccountName = "";
        break;
      case types.VERIFY_BANK_ACCOUNT:
        draft.loading = true;
        break;
      case types.VERIFY_BANK_ACCOUNT_SUCCESS:
        draft.loading = false;
        draft.bankAccountName = action.payload;
        break;
      case types.VERIFY_BANK_ACCOUNT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerRegisterReducer;
