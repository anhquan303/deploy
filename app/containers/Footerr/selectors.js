import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the footerr state domain
 */

const selectFooterrDomain = state => state.footerr || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Footerr
 */

const makeSelectFooterr = () =>
  createSelector(
    selectFooterrDomain,
    substate => substate,
  );

export default makeSelectFooterr;
export { selectFooterrDomain };
