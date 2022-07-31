/*
 *
 * DashboardReport reducer
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
const dashboardReportReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ALL_REPORT:
        draft.loading = true;
        break;
      case types.GET_ALL_REPORT_SUCCESS:
        draft.loading = false;
        draft.listReport = action.payload;
        break;
      case types.GET_ALL_REPORT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default dashboardReportReducer;
