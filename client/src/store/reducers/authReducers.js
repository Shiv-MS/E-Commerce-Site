import isEmpty from "is-empty";
import { SET_CURRENT_USER, USER_LOADING, UPDATE_CART } from "../actions/types";

export const initialState = {
  isAuthenticated: false,
  user: {},
  resetSuccess: false,
  loading: false,
  cart: [],
};

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
