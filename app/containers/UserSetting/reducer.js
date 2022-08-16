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
  messageUpdate: '',
  checkEmail: ''
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
        draft.messageUpdate = '';
        draft.checkEmail = '';
        break;
      case types.SEND_OTP:
        draft.loading = true;
        break;
      case types.SEND_OTP_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SEND_OTP_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.VERIFY_PHONE:
        draft.loading = true;
        break;
      case types.VERIFY_PHONE_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.VERIFY_PHONE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_PHONE_EMAIL:
        draft.loading = true;
        break;
      case types.UPDATE_PHONE_EMAIL_SUCCESS:
        draft.loading = false;
        draft.messageUpdate = action.payload;
        break;
      case types.UPDATE_PHONE_EMAIL_FAILED:
        draft.loading = false;
        draft.messageUpdate = action.payload;
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
      case types.SEND_OTP_EMAIL:
        draft.loading = true;
        break;
      case types.SEND_OTP_EMAIL_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SEND_OTP_EMAIL_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_EMAIL:
        draft.loading = true;
        break;
      case types.UPDATE_EMAIL_SUCCESS:
        draft.loading = false;
        draft.messageUpdate = action.payload;
        break;
      case types.UPDATE_EMAIL_FAILED:
        draft.loading = false;
        draft.messageUpdate = action.payload;
        break;
    }
  });

export default userSettingReducer;
