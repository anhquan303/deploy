/*
 *
 * SellerTurnover reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
  saleData: [],
};

/* eslint-disable default-case, no-param-reassign */
const sellerTurnoverReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_DATA_FOR_CHART:
        draft.loading = true;
        break;
      case types.GET_DATA_FOR_CHART_SUCCESS:
        draft.loading = false;
        draft.saleData = action.payload;
        break;
      case types.GET_DATA_FOR_CHART_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerTurnoverReducer;
