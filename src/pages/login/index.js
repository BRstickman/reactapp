import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Container } from '../../styles/Global';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';


export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isLoading = useSelector(state => state.auth.isLoading);
  const handleSubmit = e => {
    e.preventDefault();
    let formErrors = false;
    if(!isEmail(email)) {
      formErrors = true;
      toast.error('Email incorreto.');
    };
    if(password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha incorreta.');
    };
    if(formErrors) return;
    dispatch(actions.loginRequest({email, password, prevPath}));
  };
  return (
  <Container>
    <Loading isLoading={isLoading}/>
     <h1>Login</h1>
     <Form onSubmit={handleSubmit}>
       <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Seu Email' />
       <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Sua Senha' />
       <button type='submit'>Acessar</button>
     </Form>
  </ Container>
  );
};
