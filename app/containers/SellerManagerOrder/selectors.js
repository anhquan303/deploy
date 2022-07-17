import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerManagerOrder state domain
 */

const selectSellerManagerOrderDomain = state =>
  state.sellerManagerOrder || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerManagerOrder
 */

const makeSelectSellerManagerOrder = () =>
  createSelector(
    selectSellerManagerOrderDomain,
    substate => substate,
  );

export default makeSelectSellerManagerOrder;
export { selectSellerManagerOrderDomain };
