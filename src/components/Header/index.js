import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { Nav } from './styled';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const handleLogout = e => {
    e.preventDefault();
    dispatch(actions.loginError());
    history.push('/');
  };
  return (
    <Nav>
      <Link to="/"><FaHome size={24} /></Link>
      <Link to="/register"><FaUserAlt size={24} /></Link>
      {loggedIn ? (
        <Link to="/logout" onClick={handleLogout}><FaPowerOff size={24} /></Link>
      ) : (
        <Link to="/login"><FaSignInAlt size={24} /></Link>
      )}
    </Nav>
  );
};
