import {call, put, all, takeLatest} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({payload}) {
  try {
    const response = yield call(axios.post, '/token', payload);
    yield put(actions.loginSuccess({...response.data}));
    toast.success('Login efetuado com sucesso.');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  } catch(e) {
    toast.error('Usuário ou senha inválidos.');
    yield put(actions.loginError());
  };
};

function persistRehydrate({payload}) {
  const token = get(payload, 'auth.token', '');
  if(!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
};

function* registerRequest({payload}) {
  const {id, name, email, password} = payload;
  try {
    if(id) {
      yield call(axios.put, '/user', {name, email, password: password || undefined,});
      toast.success('Dados editados com sucesso.');
      yield put(actions.registerUpdateSuccess({name, email, password}));
    } else {
      yield call(axios.post, '/user', {name, email, password,});
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({name, email, password}));
      history.push('/login');
    };
  } catch(e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if(status === 401) {
      toast.info('Seu email foi alterado, por isso você deve realizar o login novamente.');
      yield put(actions.loginError());
      return history.push('/login');
    };

    if(errors.length > 0) {
      errors.map(error => toast.error(error));
    } else {
      toast.error('Erro desconhecido.');
    };
    yield put(actions.registerError());
  };
};

export default all([takeLatest(types.LOGIN_REQUEST, loginRequest), takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), takeLatest(types.REGISTER_REQUEST, registerRequest), ]);
