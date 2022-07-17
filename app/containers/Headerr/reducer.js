/*
 *
 * Headerr reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  cart: []
};

/* eslint-disable default-case, no-param-reassign */
const headerrReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.LOG_OUT:
        draft.loading = true;
        break;
      case types.LOG_OUT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.LOG_OUT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_CART:
        draft.loading = true;
        break;
      case types.GET_CART_SUCCESS:
        draft.loading = false;
        draft.cart = action.payload;
        break;
      case types.GET_CART_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default headerrReducer;
