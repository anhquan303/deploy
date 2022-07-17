import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerr state domain
 */

const selectHeaderrDomain = state => state.headerr || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Headerr
 */

const makeSelectHeaderr = () =>
  createSelector(
    selectHeaderrDomain,
    substate => substate,
  );

export default makeSelectHeaderr;
export { selectHeaderrDomain };
