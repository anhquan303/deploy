import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerActionProduct state domain
 */

const selectSellerActionProductDomain = state =>
  state.sellerActionProduct || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerActionProduct
 */

const makeSelectSellerActionProduct = () =>
  createSelector(
    selectSellerActionProductDomain,
    substate => substate,
  );

export default makeSelectSellerActionProduct;
export { selectSellerActionProductDomain };
