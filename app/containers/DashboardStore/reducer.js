/*
 *
 * DashboardStore reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  listStore: undefined,
  loading: false,
  message: ""
};

/* eslint-disable default-case, no-param-reassign */
const dashboardStoreReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ALL_STORE:
        draft.loading = true;
        break;
      case types.GET_ALL_STORE_SUCCESS:
        draft.loading = false;
        draft.listStore = action.payload;
        break;
      case types.GET_ALL_STORE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default dashboardStoreReducer;
