import * as types from '../types';

export function loginRequest(payload) {
  return {type: types.LOGIN_REQUEST, payload };
};

export function loginSuccess(payload) {
  return {type: types.LOGIN_SUCCESS, payload };
};

export function loginError(payload) {
  return {type: types.LOGIN_ERROR, payload };
};

export function registerRequest(payload) {
  return {type: types.REGISTER_REQUEST, payload };
};

export function registerCreatedSuccess(payload) {
  return {type: types.REGISTER_CREATION_SUCCESS, payload };
};

export function registerUpdateSuccess(payload) {
  return {type: types.REGISTER_UPDATE_SUCCESS, payload };
};

export function registerError(payload) {
  return {type: types.REGISTER_ERROR, payload };
};
