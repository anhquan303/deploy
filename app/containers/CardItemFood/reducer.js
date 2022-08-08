/*
 *
 * CardItemFood reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: ""
};

/* eslint-disable default-case, no-param-reassign */
const cardItemFoodReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.ADD_TO_CART:
        draft.loading = true;
        break;
      case types.ADD_TO_CART_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_TO_CART_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default cardItemFoodReducer;
