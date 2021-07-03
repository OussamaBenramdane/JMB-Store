import axios from 'axios';
import {
  STOCK_CREATE_FAIL,
  STOCK_CREATE_REQUEST,
  STOCK_CREATE_SUCCESS,
  STOCK_LIST_FAIL,
  STOCK_LIST_REQUEST,
  STOCK_LIST_SUCCESS,
} from '../constants/stockConstants';
import { logout } from './userActions';

export const listStocks = () => async (dispatch) => {
  try {
    dispatch({ type: STOCK_LIST_REQUEST });

    const { data } = await axios.get('/api/stock');

    dispatch({ type: STOCK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STOCK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStock =
  (name, price, qty, lequdationDate, receptionDate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STOCK_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/stock`,
        { name, price, qty, lequdationDate, receptionDate },
        config
      );

      dispatch({
        type: STOCK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: STOCK_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
