/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  token: "",
  loading: false,
  message: "",
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.LOGIN:
        draft.loading = true;
        break;
      case types.LOGIN_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.LOGIN_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default loginReducer;
