import * as types from '../types';
import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
}
export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_REQUEST: {
      const newState = {...state};
      newState.isLoading = true;
      return newState;
    }

    case types.LOGIN_SUCCESS: {
        const newState = {...state};
        newState.isLoggedIn = true;
        newState.token = action.payload.token;
        newState.user = action.payload.user;
        newState.isLoading = false;
        return newState;
    }


    case types.LOGIN_ERROR: {
        delete axios.defaults.headers.Authorization;
        const newState = {...initialState};
        return newState;
    }

    case types.REGISTER_REQUEST: {
      const newState = {...state};
      newState.isLoading = true;
      return newState;
    }

    case types.REGISTER_CREATION_SUCCESS: {
      const newState = {...state};
      newState.user.nome = action.payload.name;
      newState.user.email = action.payload.email;
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_UPDATE_SUCCESS: {
        const newState = {...state};
        newState.isLoading = false;
        return newState;
    }

    case types.REGISTER_ERROR: {
        const newState = {...state};
        newState.isLoading = false;
        return newState;
    }
      default: {return state};
    };
  };
