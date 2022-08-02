/*
 *
 * StoreProfile reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  store: undefined,
  food: [],
  storeRating: undefined,
  listVoucher: []
};

/* eslint-disable default-case, no-param-reassign */
const storeProfileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_STORE_BY_ID:
        draft.loading = true;
        break;
      case types.GET_STORE_BY_ID_SUCCESS:
        draft.loading = false;
        draft.store = action.payload;
        break;
      case types.GET_STORE_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_FOOD_BY_STORE_ID:
        draft.loading = true;
        break;
      case types.GET_FOOD_BY_STORE_ID_SUCCESS:
        draft.loading = false;
        draft.food = action.payload;
        break;
      case types.GET_FOOD_BY_STORE_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_STORE_RATING:
        draft.loading = true;
        break;
      case types.GET_STORE_RATING_SUCCESS:
        draft.loading = false;
        draft.storeRating = action.payload;
        break;
      case types.GET_STORE_RATING_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_VOUCHER_BY_STORE_ID:
        draft.loading = true;
        break;
      case types.GET_VOUCHER_BY_STORE_ID_SUCCESS:
        draft.loading = false;
        draft.listVoucher = action.payload;
        break;
      case types.GET_VOUCHER_BY_STORE_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_VOUCHER_BY_USER_ID:
        draft.loading = true;
        break;
      case types.ADD_VOUCHER_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_VOUCHER_BY_USER_ID_FAILED:
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

export default storeProfileReducer;
