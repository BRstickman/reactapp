import React from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container } from '../../styles/Global';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';


export default function Student({match}) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if(!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        const Photo = get(data, 'Photos[0].url', '');
        setPhoto(Photo);
        setName(data.name);
        setSurname(data.surname);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);
        const status = get(err, 'response.status', 0);
        if(status === 400) errors.map(error => toast.error(error));
        history.push('/');
      };
    }
    getData();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    let formErrors = false;
    if(name.length < 3 || name.length > 255) {
      toast.error('O campo "Nome" precisa ter de 3 a 255 caracteres.');
      formErrors = true;
    };
    if(surname.length < 3 || surname.length > 255) {
      toast.error('O campo "Sobrenome" precisa ter de 3 a 255 caracteres.');
      formErrors = true;
    };
    if(!isEmail(email)) {
      toast.error('Email inválido.');
      formErrors = true;
    };
    if(!isInt(String(age))) {
      toast.error('O campo "Idade" precisa ser um número inteiro.');
      formErrors = true;
    };
    if(!isFloat(String(weight))) {
      toast.error('O campo "Peso" precisa ser um número inteiro ou de ponto flutuante.');
      formErrors = true;
    };
    if(!isFloat(String(height))) {
      toast.error('O campo "Altura" precisa ser um número inteiro ou de ponto flutuante. (Use o sinal de ponto, não a vírgula)');
      formErrors = true;
    };

    if(formErrors) return;

    try {
      setIsLoading(true);
      if(id) {
        await axios.put(`/students/${id}`, {name, surname, email, age, weight, height});
        toast.success('Aluno(a) editado(a) com sucesso.');
      } else {
        await axios.post(`/students/`, {name, surname, email, age, weight, height});
        toast.success('Aluno(a) criado(a) com sucesso.');
        toast.warn('Você pode adicionar uma foto para o aluno na aba de edição de informações.');
        history.push('/');
      };
      setIsLoading(false);
    } catch(err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if(errors.length > 0) {
        errors.map(error => toast.error(error));
      } else {
        toast.error('Erro desconhecido.');
      };

      if(status === 401) dispatch(actions.loginError());
    };
  };
  return (
  <Container>
    <Loading isLoading={isLoading} />
     <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>
     {id && (
       <ProfilePicture>
         {photo ? <img src={photo} alt={name} /> : <FaUserCircle size={180} />}
         <Link to={`/photo/${id}`}>
           <FaEdit size={24} />
         </Link>
       </ProfilePicture>
     )}
     <Form onSubmit={handleSubmit}>
       <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome' />
       <input type='text' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Sobrenome' />
       <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
       <input type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='Idade' />
       <input type='text' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Peso' />
       <input type='text' value={height} onChange={(e) => setHeight(e.target.value)} placeholder='Altura' />
       <button>{id ? 'Editar' : 'Salvar'}</button>
     </Form>
  </Container>
  );
};

Student.propTypes = {match: PropTypes.shape({}).isRequired, };
