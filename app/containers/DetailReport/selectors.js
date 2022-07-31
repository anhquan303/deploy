import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the detailReport state domain
 */

const selectDetailReportDomain = state => state.detailReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DetailReport
 */

const makeSelectDetailReport = () =>
  createSelector(
    selectDetailReportDomain,
    substate => substate,
  );

export default makeSelectDetailReport;
export { selectDetailReportDomain };
