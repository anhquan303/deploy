import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userOrderHistory state domain
 */

const selectUserOrderHistoryDomain = state =>
  state.userOrderHistory || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserOrderHistory
 */

const makeSelectUserOrderHistory = () =>
  createSelector(
    selectUserOrderHistoryDomain,
    substate => substate,
  );

export default makeSelectUserOrderHistory;
export { selectUserOrderHistoryDomain };
