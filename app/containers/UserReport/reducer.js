/*
 *
 * UserReport reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  listReport: []
};

/* eslint-disable default-case, no-param-reassign */
const userReportReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_LIST_REPORT_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_LIST_REPORT_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.listReport = action.payload;
        break;
      case types.GET_LIST_REPORT_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.USER_ADD_REPORT:
        draft.loading = true;
        break;
      case types.USER_ADD_REPORT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.USER_ADD_REPORT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default userReportReducer;
