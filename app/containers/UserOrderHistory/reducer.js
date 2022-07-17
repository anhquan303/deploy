/*
 *
 * UserOrderHistory reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  orderList: []
};

/* eslint-disable default-case, no-param-reassign */
const userOrderHistoryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ORDER_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_ORDER_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.orderList = action.payload;
        break;
      case types.GET_ORDER_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default userOrderHistoryReducer;
