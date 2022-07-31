import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerDetailReport state domain
 */

const selectSellerDetailReportDomain = state =>
  state.sellerDetailReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerDetailReport
 */

const makeSelectSellerDetailReport = () =>
  createSelector(
    selectSellerDetailReportDomain,
    substate => substate,
  );

export default makeSelectSellerDetailReport;
export { selectSellerDetailReportDomain };
