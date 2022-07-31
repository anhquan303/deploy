/*
 *
 * SellerOrderDetail reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: '',
  orderDetail: [],
};

/* eslint-disable default-case, no-param-reassign */
const sellerOrderDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_ORDER_DETAIL_BY_ID:
        draft.loading = true;
        break;
      case types.GET_ORDER_DETAIL_BY_ID_SUCCESS:
        draft.loading = false;
        draft.orderDetail = action.payload;
        break;
      case types.GET_ORDER_DETAIL_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_ORDER:
        draft.loading = true;
        break;
      case types.CHANGE_STATUS_TO_ORDER_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_ORDER_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = '';
      case types.CHANGE_STATUS_TO_PAID:
        draft.loading = true;
        break;
      case types.CHANGE_STATUS_TO_PAID_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_PAID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_DELIVERY:
        draft.loading = true;
        break;
      case types.CHANGE_STATUS_TO_DELIVERY_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_DELIVERY_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_DELIVERED:
        draft.loading = true;
        break;
      case types.CHANGE_STATUS_TO_DELIVERED_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.CHANGE_STATUS_TO_DELIVERED_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerOrderDetailReducer;
