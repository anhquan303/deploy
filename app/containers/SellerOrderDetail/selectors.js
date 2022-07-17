import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerOrderDetail state domain
 */

const selectSellerOrderDetailDomain = state =>
  state.sellerOrderDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerOrderDetail
 */

const makeSelectSellerOrderDetail = () =>
  createSelector(
    selectSellerOrderDetailDomain,
    substate => substate,
  );

export default makeSelectSellerOrderDetail;
export { selectSellerOrderDetailDomain };
