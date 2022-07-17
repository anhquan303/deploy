import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userForgetPassword state domain
 */

const selectUserForgetPasswordDomain = state =>
  state.userForgetPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserForgetPassword
 */

const makeSelectUserForgetPassword = () =>
  createSelector(
    selectUserForgetPasswordDomain,
    substate => substate,
  );

export default makeSelectUserForgetPassword;
export { selectUserForgetPasswordDomain };
