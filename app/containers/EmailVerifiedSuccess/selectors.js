import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the emailVerifiedSuccess state domain
 */

const selectEmailVerifiedSuccessDomain = state =>
  state.emailVerifiedSuccess || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmailVerifiedSuccess
 */

const makeSelectEmailVerifiedSuccess = () =>
  createSelector(
    selectEmailVerifiedSuccessDomain,
    substate => substate,
  );

export default makeSelectEmailVerifiedSuccess;
export { selectEmailVerifiedSuccessDomain };
