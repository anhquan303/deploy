import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userSetting state domain
 */

const selectUserSettingDomain = state => state.userSetting || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserSetting
 */

const makeSelectUserSetting = () =>
  createSelector(
    selectUserSettingDomain,
    substate => substate,
  );

export default makeSelectUserSetting;
export { selectUserSettingDomain };
