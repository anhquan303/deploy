/*
 *
 * UserSetting reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
  user: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const userSettingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.UPDATE_USER:
        draft.loading = true;
        break;
      case types.UPDATE_USER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_USER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_USER_BY_ID:
        draft.loading = true;
        break;
      case types.GET_USER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.user = action.payload;
        break;
      case types.GET_USER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = '';
        break;
    }
  });

export default userSettingReducer;
