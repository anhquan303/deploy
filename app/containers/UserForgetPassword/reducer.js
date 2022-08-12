/*
 *
 * UserForgetPassword reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
  checkEmail: ''
};

/* eslint-disable default-case, no-param-reassign */
const userForgetPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.FORGET_PASSWORD:
        draft.loading = true;
        break;
      case types.FORGET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.FORGET_PASSWORD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = '';
        draft.checkEmail = '';
        break;
      case types.VERIFY_EMAIL:
        draft.loading = true;
        break;
      case types.VERIFY_EMAIL_SUCCESS:
        draft.loading = false;
        draft.checkEmail = action.payload;
        break;
      case types.VERIFY_EMAIL_FAILED:
        draft.loading = false;
        draft.checkEmail = action.payload;
        break;
    }
  });

export default userForgetPasswordReducer;
