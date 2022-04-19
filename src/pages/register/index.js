import React from 'react';
import { Container } from '../../styles/Global';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { isEmail } from 'validator';
import { FormContainer } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';


export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.user.id);
  const storedName = useSelector(state => state.auth.user.nome);
  const storedEmail = useSelector(state => state.auth.user.email);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if(!id) return;
    setName(storedName);
    setEmail(storedEmail);
  }, [id, storedName, storedEmail]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    if(name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('"Nome" deve ter entre 3 a 255 caracteres.');
    };
    if(!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido.');
    };
    if(!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('"Senha" deve ter entre 6 a 50 caracteres.');
    };
    if(formErrors) return;

    dispatch(actions.registerRequest({id, name, email, password}));

  };
  return (
  <Container>
    <Loading isLoading={isLoading} />
     <h1>{id ? 'Editar seus dados' : 'Criar uma nova conta'}</h1>
     <FormContainer onSubmit={handleSubmit}>
       <label htmlFor='name'>Nome:<input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Seu nome' /></label>
       <label htmlFor='email'>Email:<input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Seu email' /></label>
       <label htmlFor='password'>Senha:<input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Sua senha' /></label>
       <button type='submit'>{id ? 'Salvar' : 'Criar uma nova conta'}</button>
     </FormContainer>
  </ Container>
  );
};
