import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userResetPassword state domain
 */

const selectUserResetPasswordDomain = state =>
  state.userResetPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserResetPassword
 */

const makeSelectUserResetPassword = () =>
  createSelector(
    selectUserResetPasswordDomain,
    substate => substate,
  );

export default makeSelectUserResetPassword;
export { selectUserResetPasswordDomain };
