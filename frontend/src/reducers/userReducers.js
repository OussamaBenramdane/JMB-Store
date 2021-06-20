import {
  PROD_DETAILS_FAIL,
  PROD_DETAILS_REQUEST,
  PROD_DETAILS_SUCCESS,
  PROD_REGISTER_FAIL,
  PROD_REGISTER_REQUEST,
  PROD_REGISTER_SUCCESS,
  PROD_UPDATE_PROFILE_FAIL,
  PROD_UPDATE_PROFILE_REQUEST,
  PROD_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prodRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PROD_REGISTER_REQUEST:
      return { loading: true };
    case PROD_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case PROD_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prodDetailsReducer = (state = { prod: {} }, action) => {
  switch (action.type) {
    case PROD_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROD_DETAILS_SUCCESS:
      return { loading: false, prod: action.payload };
    case PROD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prodUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROD_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case PROD_UPDATE_PROFILE_SUCCESS:
      return { loading: false, successProd: true, userInfo: action.payload };
    case PROD_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
