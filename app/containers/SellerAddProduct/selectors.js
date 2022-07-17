import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerAddProduct state domain
 */

const selectSellerAddProductDomain = state =>
  state.sellerAddProduct || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerAddProduct
 */

const makeSelectSellerAddProduct = () =>
  createSelector(
    selectSellerAddProductDomain,
    substate => substate,
  );

export default makeSelectSellerAddProduct;
export { selectSellerAddProductDomain };
