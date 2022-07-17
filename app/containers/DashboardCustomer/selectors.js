import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardCustomer state domain
 */

const selectDashboardCustomerDomain = state =>
  state.dashboardCustomer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardCustomer
 */

const makeSelectDashboardCustomer = () =>
  createSelector(
    selectDashboardCustomerDomain,
    substate => substate,
  );

export default makeSelectDashboardCustomer;
export { selectDashboardCustomerDomain };
