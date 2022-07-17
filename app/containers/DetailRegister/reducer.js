/*
 *
 * DetailRegister reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  status: "",
  register: undefined
};

/* eslint-disable default-case, no-param-reassign */
const detailRegisterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.APPROVED_STORE:
        draft.loading = true;
        break;
      case types.APPROVED_STORE_SUCCESS:
        draft.loading = false;
        draft.status = action.payload;
        break;
      case types.APPROVED_STORE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DECLINED_STORE:
        draft.loading = true;
        break;
      case types.DECLINED_STORE_SUCCESS:
        draft.loading = false;
        draft.status = action.payload;
        break;
      case types.DECLINED_STORE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        draft.status = "";
        break;
      case types.GET_REGISTER_BY_ID:
        draft.loading = true;
        break;
      case types.GET_REGISTER_BY_ID_SUCCESS:
        draft.loading = false;
        draft.register = action.payload;
        break;
      case types.GET_REGISTER_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default detailRegisterReducer;
