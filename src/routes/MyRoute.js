import React from "react";
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MyRoute({component: Component, isClosed, ...remain}) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  if(isClosed && !isLoggedIn) {
    return (<Redirect to={{pathname: '/login', state: {prevPath: remain.location.pathname}}} />);
  };
  return <Route {...remain} component={Component} />
};

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isClosed: PropTypes.bool,
};
