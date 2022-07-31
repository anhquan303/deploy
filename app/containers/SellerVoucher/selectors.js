import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerVoucher state domain
 */

const selectSellerVoucherDomain = state => state.sellerVoucher || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerVoucher
 */

const makeSelectSellerVoucher = () =>
  createSelector(
    selectSellerVoucherDomain,
    substate => substate,
  );

export default makeSelectSellerVoucher;
export { selectSellerVoucherDomain };
