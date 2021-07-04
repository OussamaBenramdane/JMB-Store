import {
  STOCK_LIST_REQUEST,
  STOCK_LIST_SUCCESS,
  STOCK_LIST_FAIL,
  STOCK_DELETE_REQUEST,
  STOCK_DELETE_SUCCESS,
  STOCK_DELETE_FAIL,
  STOCK_CREATE_RESET,
  STOCK_CREATE_FAIL,
  STOCK_CREATE_SUCCESS,
  STOCK_CREATE_REQUEST,
} from '../constants/stockConstants';

export const stockListReducer = (state = { stocks: [] }, action) => {
  switch (action.type) {
    case STOCK_LIST_REQUEST:
      return { loading: true, stocks: [] };
    case STOCK_LIST_SUCCESS:
      return { loading: false, stocks: action.payload };
    case STOCK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_CREATE_REQUEST:
      return {
        loading: true,
      };
    case STOCK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        stock: action.payload,
      };
    case STOCK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case STOCK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


export const stocktDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_DELETE_REQUEST:
      return { loading: true };
    case STOCK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STOCK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
