/*
 *
 * Cart reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  listOrder: [],
  message: '',
  listVoucher: [],
};

/* eslint-disable default-case, no-param-reassign */
const cartReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ORDER:
        draft.loading = true;
        break;
      case types.GET_ORDER_SUCCESS:
        draft.loading = false;
        draft.listOrder = action.payload;
        break;
      case types.GET_ORDER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      // ADD
      case types.ADD_QUANTITY_FOOD:
        draft.loading = true;
        break;
      case types.ADD_QUANTITY_FOOD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_QUANTITY_FOOD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      // SUB
      case types.SUB_QUANTITY_FOOD:
        draft.loading = true;
        break;
      case types.SUB_QUANTITY_FOOD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SUB_QUANTITY_FOOD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      // DELETE
      case types.DELETE_FOOD:
        draft.loading = true;
        break;
      case types.DELETE_FOOD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_FOOD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      // RESET
      case types.RESET:
        draft.loading = false;
        draft.message = '';
        break;
      // DELETE ALL CART
      case types.DELETE_ALL_CART:
        draft.loading = true;
        break;
      case types.DELETE_ALL_CART_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_ALL_CART_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_VOUCHER:
        draft.loading = true;
        break;
      case types.GET_VOUCHER_SUCCESS:
        draft.loading = false;
        draft.listVoucher = action.payload;
        break;
      case types.GET_VOUCHER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default cartReducer;
