/*
 *
 * UserAddress reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  listAddress: [],
  listWard: [],
  location: undefined,
  locationUser: []
};

/* eslint-disable default-case, no-param-reassign */
const userAddressReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ALL_LOCATION:
        draft.loading = true;
        break;
      case types.GET_ALL_LOCATION_SUCCESS:
        draft.loading = false;
        draft.listAddress = action.payload;
        break;
      case types.GET_ALL_LOCATION_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LIST_WARDS:
        draft.loading = true;
        break;
      case types.GET_LIST_WARDS_SUCCESS:
        draft.loading = false;
        draft.listWard = action.payload;
        break;
      case types.GET_LIST_WARDS_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_LOCATION:
        draft.loading = true;
        break;
      case types.ADD_LOCATION_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_LOCATION_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        draft.location = undefined;
        break;
      case types.GET_LOCATION_BY_ID:
        draft.loading = true;
        break;
      case types.GET_LOCATION_BY_ID_SUCCESS:
        draft.loading = false;
        draft.location = action.payload;
        break;
      case types.GET_LOCATION_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_LOCATION:
        draft.loading = true;
        break;
      case types.UPDATE_LOCATION_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_LOCATION:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_LOCATION:
        draft.loading = true;
        break;
      case types.DELETE_LOCATION_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_LOCATION_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LOCATION_BY_USER_ID:
        draft.loading = true;
        break;
      case types.GET_LOCATION_BY_USER_ID_SUCCESS:
        draft.loading = false;
        draft.locationUser = action.payload;
        break;
      case types.GET_LOCATION_BY_USER_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default userAddressReducer;
