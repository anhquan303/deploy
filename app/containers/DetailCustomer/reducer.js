/*
 *
 * DetailCustomer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  user: undefined,
  listOrder: [],
  listLocation: []
};

/* eslint-disable default-case, no-param-reassign */
const detailCustomerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_USER_BY_ID:
        draft.loading = true;
        break;
      case types.GET_USER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.user = action.payload;
        break;
      case types.GET_USER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DECLINED_USER:
        draft.loading = true;
        break;
      case types.DECLINED_USER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DECLINED_USER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
      case types.APPROVED_USER:
        draft.loading = true;
        break;
      case types.APPROVED_USER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.APPROVED_USER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_ORDER_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_ORDER_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.listOrder = action.payload;
        break;
      case types.GET_ORDER_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LOCATION:
        draft.loading = true;
        break;
      case types.GET_LOCATION_SUCCESS:
        draft.loading = false;
        draft.listLocation = action.payload;
        break;
      case types.GET_LOCATION_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default detailCustomerReducer;
