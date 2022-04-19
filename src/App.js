import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import history from './services/history';
import GlobalStyle from './styles/Global';
import Header from '../src/components/Header';
import Routes from './routes';

function App() {
  return (<Provider store={store}><PersistGate persistor={persistor}><Router history={history}> <Header /> <Routes /> <GlobalStyle /> <ToastContainer autoClose={4000} className='toast-container'/> </Router> </PersistGate> </Provider>);
}

export default App;
