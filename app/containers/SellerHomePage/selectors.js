import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerHomePage state domain
 */

const selectSellerHomePageDomain = state =>
  state.sellerHomePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerHomePage
 */

const makeSelectSellerHomePage = () =>
  createSelector(
    selectSellerHomePageDomain,
    substate => substate,
  );

export default makeSelectSellerHomePage;
export { selectSellerHomePageDomain };
