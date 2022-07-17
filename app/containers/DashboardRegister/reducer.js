/*
 *
 * DashboardRegister reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  registerList: [],
  loading: false,
  message: ""
};

/* eslint-disable default-case, no-param-reassign */
const dashboardRegisterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.FETCH_LIST_REGISTER:
        draft.loading = true;
        break;
      case types.FETCH_LIST_REGISTER_SUCCESS:
        draft.loading = false;
        draft.registerList = action.payload;
        break;
      case types.FETCH_LIST_REGISTER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default dashboardRegisterReducer;
