import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userVoucher state domain
 */

const selectUserVoucherDomain = state => state.userVoucher || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserVoucher
 */

const makeSelectUserVoucher = () =>
  createSelector(
    selectUserVoucherDomain,
    substate => substate,
  );

export default makeSelectUserVoucher;
export { selectUserVoucherDomain };
