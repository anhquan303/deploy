import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerTurnover state domain
 */

const selectSellerTurnoverDomain = state =>
  state.sellerTurnover || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerTurnover
 */

const makeSelectSellerTurnover = () =>
  createSelector(
    selectSellerTurnoverDomain,
    substate => substate,
  );

export default makeSelectSellerTurnover;
export { selectSellerTurnoverDomain };
