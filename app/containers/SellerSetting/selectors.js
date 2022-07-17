import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sellerSetting state domain
 */

const selectSellerSettingDomain = state => state.sellerSetting || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SellerSetting
 */

const makeSelectSellerSetting = () =>
  createSelector(
    selectSellerSettingDomain,
    substate => substate,
  );

export default makeSelectSellerSetting;
export { selectSellerSettingDomain };
