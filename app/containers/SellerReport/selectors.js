import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerReport state domain
 */

const selectSellerReportDomain = state => state.sellerReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerReport
 */

const makeSelectSellerReport = () =>
  createSelector(
    selectSellerReportDomain,
    substate => substate,
  );

export default makeSelectSellerReport;
export { selectSellerReportDomain };
