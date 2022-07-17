import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the foodDetail state domain
 */

const selectFoodDetailDomain = state => state.foodDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FoodDetail
 */

const makeSelectFoodDetail = () =>
  createSelector(
    selectFoodDetailDomain,
    substate => substate,
  );

export default makeSelectFoodDetail;
export { selectFoodDetailDomain };
