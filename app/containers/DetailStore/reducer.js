/*
 *
 * DetailStore reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  status: "",
  store: undefined
};

/* eslint-disable default-case, no-param-reassign */
const detailStoreReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.DECLINED_STORE:
        draft.loading = true;
        break;
      case types.DECLINED_STORE_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DECLINED_STORE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
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
      case types.APPROVED_STORE:
        draft.loading = true;
        break;
      case types.APPROVED_STORE_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.APPROVED_STORE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default detailStoreReducer;
