import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userDetailOrder state domain
 */

const selectUserDetailOrderDomain = state =>
  state.userDetailOrder || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserDetailOrder
 */

const makeSelectUserDetailOrder = () =>
  createSelector(
    selectUserDetailOrderDomain,
    substate => substate,
  );

export default makeSelectUserDetailOrder;
export { selectUserDetailOrderDomain };
