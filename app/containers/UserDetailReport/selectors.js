import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userDetailReport state domain
 */

const selectUserDetailReportDomain = state =>
  state.userDetailReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserDetailReport
 */

const makeSelectUserDetailReport = () =>
  createSelector(
    selectUserDetailReportDomain,
    substate => substate,
  );

export default makeSelectUserDetailReport;
export { selectUserDetailReportDomain };
