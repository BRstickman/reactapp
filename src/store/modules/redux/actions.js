import * as types from '../types';

export function buttonClickRequest() {
  return {type: types.CLICKED_BUTTON_REQUEST, };
};

export function buttonClickSuccess() {
  return {type: types.CLICKED_BUTTON_SUCCESS, };
};

export function buttonClickError() {
  return {type: types.CLICKED_BUTTON_ERROR, };
};
