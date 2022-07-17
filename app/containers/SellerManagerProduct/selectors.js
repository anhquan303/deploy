import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerManagerProduct state domain
 */

const selectSellerManagerProductDomain = state =>
  state.sellerManagerProduct || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerManagerProduct
 */

const makeSelectSellerManagerProduct = () =>
  createSelector(
    selectSellerManagerProductDomain,
    substate => substate,
  );

export default makeSelectSellerManagerProduct;
export { selectSellerManagerProductDomain };
