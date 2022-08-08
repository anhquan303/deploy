import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cardItemFood state domain
 */

const selectCardItemFoodDomain = state => state.cardItemFood || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CardItemFood
 */

const makeSelectCardItemFood = () =>
  createSelector(
    selectCardItemFoodDomain,
    substate => substate,
  );

export default makeSelectCardItemFood;
export { selectCardItemFoodDomain };
