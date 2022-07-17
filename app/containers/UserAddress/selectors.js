import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userAddress state domain
 */

const selectUserAddressDomain = state => state.userAddress || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserAddress
 */

const makeSelectUserAddress = () =>
  createSelector(
    selectUserAddressDomain,
    substate => substate,
  );

export default makeSelectUserAddress;
export { selectUserAddressDomain };
