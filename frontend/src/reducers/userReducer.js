import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,

} from "../constants/userConstants.js";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:

      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_USER_SUCCESS :
    case LOGIN_SUCCESS:

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case REGISTER_USER_FAIL: 
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
