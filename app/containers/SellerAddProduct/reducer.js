/*
 *
 * SellerAddProduct reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const sellerAddProductReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.ADD_PRODUCT:
        draft.loading = true;
        break;
      case types.ADD_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default sellerAddProductReducer;
