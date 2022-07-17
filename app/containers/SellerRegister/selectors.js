import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerRegister state domain
 */

const selectSellerRegisterDomain = state =>
  state.sellerRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerRegister
 */

const makeSelectSellerRegister = () =>
  createSelector(
    selectSellerRegisterDomain,
    substate => substate,
  );

export default makeSelectSellerRegister;
export { selectSellerRegisterDomain };
