import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the detailCustomer state domain
 */

const selectDetailCustomerDomain = state =>
  state.detailCustomer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DetailCustomer
 */

const makeSelectDetailCustomer = () =>
  createSelector(
    selectDetailCustomerDomain,
    substate => substate,
  );

export default makeSelectDetailCustomer;
export { selectDetailCustomerDomain };
