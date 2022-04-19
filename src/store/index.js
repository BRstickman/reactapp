import {persistStore} from 'redux-persist';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from './modules/rootReducer';
import rootSaga from "./modules/rootSagas";
import persistedReducers from './modules/persist';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducers(rootReducer), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
export const persistor = persistStore(store);
