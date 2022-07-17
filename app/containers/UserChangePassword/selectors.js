import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userChangePassword state domain
 */

const selectUserChangePasswordDomain = state =>
  state.userChangePassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserChangePassword
 */

const makeSelectUserChangePassword = () =>
  createSelector(
    selectUserChangePasswordDomain,
    substate => substate,
  );

export default makeSelectUserChangePassword;
export { selectUserChangePasswordDomain };
