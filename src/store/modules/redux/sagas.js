import {call, put, all, takeLatest} from 'redux-saga/effects';
import * as actions from './actions';
import * as types from '../types';

const request = () => new Promise((resolve, reject) => {
  setTimeout(() => {resolve()}, 600)
});

function* request2() {
  try {
    yield call(request);
    yield put(actions.buttonClickSuccess());
  } catch (e) {
    yield put(actions.buttonClickError());
  }
};

export default all([takeLatest(types.CLICKED_BUTTON_REQUEST, request2)]);
