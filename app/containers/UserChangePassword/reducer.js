/*
 *
 * UserChangePassword reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
};

/* eslint-disable default-case, no-param-reassign */
const userChangePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.CHANGE_PASSWORD:
        draft.loading = true;
        break;
      case types.CHANGE_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_PASSWORD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = '';
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
    }
  });

export default userChangePasswordReducer;
