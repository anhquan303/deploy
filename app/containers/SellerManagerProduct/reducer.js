/*
 *
 * SellerManagerProduct reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  foodList: [],
  loading: false,
  message: ""
};

/* eslint-disable default-case, no-param-reassign */
const sellerManagerProductReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.FETCH_LIST_FOOD:
        draft.loading = true;
        break;
      case types.FETCH_LIST_FOOD_SUCCESS:
        draft.loading = false;
        draft.foodList = action.payload;
        break;
      case types.FETCH_LIST_FOOD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SEARCH_FOOD:
        draft.loading = true;
        break;
      case types.SEARCH_FOOD_SUCCESS:
        draft.loading = false;
        draft.foodList = action.payload;
        break;
      case types.SEARCH_FOOD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerManagerProductReducer;
