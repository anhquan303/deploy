/*
 *
 * UserDetailOrder reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
  order: [],
  voucher: undefined
};

/* eslint-disable default-case, no-param-reassign */
const userDetailOrderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ORDER_DETAIL_BY_ID:
        draft.loading = true;
        break;
      case types.GET_ORDER_DETAIL_BY_ID_SUCCESS:
        draft.loading = false;
        draft.order = action.payload;
        break;
      case types.GET_ORDER_DETAIL_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CANCEL_ORDER:
        draft.loading = true;
        break;
      case types.CANCEL_ORDER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CANCEL_ORDER_FAILED:
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
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default userDetailOrderReducer;
