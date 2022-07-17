import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the detailStore state domain
 */

const selectDetailStoreDomain = state => state.detailStore || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DetailStore
 */

const makeSelectDetailStore = () =>
  createSelector(
    selectDetailStoreDomain,
    substate => substate,
  );

export default makeSelectDetailStore;
export { selectDetailStoreDomain };
