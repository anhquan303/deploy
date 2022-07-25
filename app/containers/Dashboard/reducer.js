/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  storeList: [],
  loading: false,
  message: "",
  userList: [],
  foodList: []
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ALL_STORE:
        draft.loading = true;
        break;
      case types.GET_ALL_STORE_SUCCESS:
        draft.loading = false;
        draft.storeList = action.payload;
        break;
      case types.GET_ALL_STORE_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_ALL_USER:
        draft.loading = true;
        break;
      case types.GET_ALL_USER_SUCCESS:
        draft.loading = false;
        draft.userList = action.payload;
        break;
      case types.GET_ALL_USER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_ALL_FOOD:
        draft.loading = true;
        break;
      case types.GET_ALL_FOOD_SUCCESS:
        draft.loading = false;
        draft.foodList = action.payload;
        break;
      case types.GET_ALL_FOOD_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default dashboardReducer;
