/*
 *
 * DashboardCustomer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  userList: [],
  loading: false,
  message: ""
};

/* eslint-disable default-case, no-param-reassign */
const dashboardCustomerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.FETCH_LIST_USER:
        draft.loading = true;
        break;
      case types.FETCH_LIST_USER_SUCCESS:
        draft.loading = false;
        draft.userList = action.payload;
        break;
      case types.FETCH_LIST_USER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default dashboardCustomerReducer;
