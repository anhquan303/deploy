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
  listLocation: []
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
    }
  });

export default paymentReducer;
