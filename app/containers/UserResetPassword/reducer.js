/*
 *
 * UserResetPassword reducer
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
const userResetPasswordReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.RESET_PASSWORD:
        draft.loading = true;
        break;
      case types.RESET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET_PASSWORD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default userResetPasswordReducer;
