import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL


} from "../constants/userConstants.js";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
    
      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_USER_SUCCESS :
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
    case LOGOUT_USER_SUCCESS:

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };

    case REGISTER_USER_FAIL: 
    case LOGIN_FAIL:
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    
      
    case LOAD_USER_FAIL:
      return{
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }
      
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
