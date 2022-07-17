/*
 *
 * SellerActionProduct reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  food: undefined,
  active: "ACTIVE"
};

/* eslint-disable default-case, no-param-reassign */
const sellerActionProductReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.DELETE_PRODUCT:
        draft.loading = true;
        break;
      case types.DELETE_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_PRODUCT:
        draft.loading = true;
        break;
      case types.UPDATE_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
      case types.GET_PRODUCT_BY_ID:
        draft.loading = true;
        break;
      case types.GET_PRODUCT_BY_ID_SUCCESS:
        draft.loading = false;
        draft.food = action.payload;
        break;
      case types.GET_PRODUCT_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ACTIVE_PRODUCT:
        draft.loading = true;
        break;
      case types.ACTIVE_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.active = action.payload;
        break;
      case types.ACTIVE_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DEACTIVE_PRODUCT:
        draft.loading = true;
        break;
      case types.DEACTIVE_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.active = action.payload;
        break;
      case types.DEACTIVE_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerActionProductReducer;
