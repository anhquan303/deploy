import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userReport state domain
 */

const selectUserReportDomain = state => state.userReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserReport
 */

const makeSelectUserReport = () =>
  createSelector(
    selectUserReportDomain,
    substate => substate,
  );

export default makeSelectUserReport;
export { selectUserReportDomain };
