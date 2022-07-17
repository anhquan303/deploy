import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userRegister state domain
 */

const selectUserRegisterDomain = state => state.userRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserRegister
 */

const makeSelectUserRegister = () =>
  createSelector(
    selectUserRegisterDomain,
    substate => substate,
  );

export default makeSelectUserRegister;
export { selectUserRegisterDomain };
