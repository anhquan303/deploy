/*
 *
 * UserVoucher reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  listVoucher: []
};

/* eslint-disable default-case, no-param-reassign */
const userVoucherReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_LIST_VOUCHER_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_LIST_VOUCHER_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.listVoucher = action.payload;
        break;
      case types.GET_LIST_VOUCHER_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.USER_DELETE_VOUCHER_ID:
        draft.loading = true;
        break;
      case types.USER_DELETE_VOUCHER_ID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.USER_DELETE_VOUCHER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default userVoucherReducer;
