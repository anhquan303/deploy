import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userRatingComment state domain
 */

const selectUserRatingCommentDomain = state =>
  state.userRatingComment || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserRatingComment
 */

const makeSelectUserRatingComment = () =>
  createSelector(
    selectUserRatingCommentDomain,
    substate => substate,
  );

export default makeSelectUserRatingComment;
export { selectUserRatingCommentDomain };
