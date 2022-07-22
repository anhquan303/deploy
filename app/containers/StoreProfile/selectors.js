import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the storeProfile state domain
 */

const selectStoreProfileDomain = state => state.storeProfile || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StoreProfile
 */

const makeSelectStoreProfile = () =>
  createSelector(
    selectStoreProfileDomain,
    substate => substate,
  );

export default makeSelectStoreProfile;
export { selectStoreProfileDomain };
