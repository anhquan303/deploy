import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardStore state domain
 */

const selectDashboardStoreDomain = state =>
  state.dashboardStore || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardStore
 */

const makeSelectDashboardStore = () =>
  createSelector(
    selectDashboardStoreDomain,
    substate => substate,
  );

export default makeSelectDashboardStore;
export { selectDashboardStoreDomain };
