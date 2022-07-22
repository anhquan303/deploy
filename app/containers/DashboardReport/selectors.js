import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardReport state domain
 */

const selectDashboardReportDomain = state =>
  state.dashboardReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DashboardReport
 */

const makeSelectDashboardReport = () =>
  createSelector(
    selectDashboardReportDomain,
    substate => substate,
  );

export default makeSelectDashboardReport;
export { selectDashboardReportDomain };
