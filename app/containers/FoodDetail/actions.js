/*
 *
 * FoodDetail actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getFoodById(payload) {
  return {
    type: types.GET_FOOD_BY_ID,
    payload,
  };
}

export function getFoodByIdSuccess(payload) {
  return {
    type: types.GET_FOOD_BY_ID_SUCCESS,
    payload,
  };
}

export function getFoodByIdFailed(payload) {
  return {
    type: types.GET_FOOD_BY_ID_FAILED,
    payload,
  };
}

export function getRatingFoodById(payload) {
  return {
    type: types.GET_RATING_FOOD_BY_ID,
    payload,
  };
}

export function getRatingFoodByIdSuccess(payload) {
  return {
    type: types.GET_RATING_FOOD_BY_ID_SUCCESS,
    payload,
  };
}

export function getRatingFoodByIdFailed(payload) {
  return {
    type: types.GET_RATING_FOOD_BY_ID_FAILED,
    payload,
  };
}

export function getListCommentFoodById(payload) {
  return {
    type: types.GET_LIST_COMMENT_FOOD_BY_ID,
    payload,
  };
}

export function getListCommentFoodByIdSuccess(payload) {
  return {
    type: types.GET_LIST_COMMENT_FOOD_BY_ID_SUCCESS,
    payload,
  };
}

export function getListCommentFoodByIdFailed(payload) {
  return {
    type: types.GET_LIST_COMMENT_FOOD_BY_ID_FAILED,
    payload,
  };
}

export function addToCart(payload) {
  return {
    type: types.ADD_TO_CART,
    payload,
  };
}

export function addToCartSuccess(payload) {
  return {
    type: types.ADD_TO_CART_SUCCESS,
    payload,
  };
}

export function addToCartFailed(payload) {
  return {
    type: types.ADD_TO_CART_FAILED,
    payload,
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload,
  };
}

// export function getCart(payload) {
//   return {
//     type: types.GET_CART_BY_ID,
//     payload,
//   };
// }

// export function getCartSuccess(payload) {
//   return {
//     type: types.GET_CART_BY_ID_SUCCESS,
//     payload,
//   };
// }


// export function getCartFailed(payload) {
//   return {
//     type: types.GET_CART_BY_ID_FAILED,
//     payload,
//   };
// }




