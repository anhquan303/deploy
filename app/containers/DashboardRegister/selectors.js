import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardRegister state domain
 */

const selectDashboardRegisterDomain = state =>
  state.dashboardRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardRegister
 */

const makeSelectDashboardRegister = () =>
  createSelector(
    selectDashboardRegisterDomain,
    substate => substate,
  );

export default makeSelectDashboardRegister;
export { selectDashboardRegisterDomain };
