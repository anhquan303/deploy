import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the detailRegister state domain
 */

const selectDetailRegisterDomain = state =>
  state.detailRegister || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DetailRegister
 */

const makeSelectDetailRegister = () =>
  createSelector(
    selectDetailRegisterDomain,
    substate => substate,
  );

export default makeSelectDetailRegister;
export { selectDetailRegisterDomain };
