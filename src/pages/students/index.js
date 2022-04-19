import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Container } from '../../styles/Global';
import { StudentsContainer, PhotosContainer, NewStudent } from './styled';
import Loading from '../../components/Loading';

export default function Students() {
  const [students, setStudents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    };
    getData();
  }, []);

  const handleDeleteAsk = e => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/students/${id}`);
      const update = [...students];
      update.splice(index, 1);
      setStudents(update);
      setIsLoading(false);
    } catch(err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map(error => toast.error(error));
      setIsLoading(false);
    };
  };
  return (
  <Container>
    <Loading isLoading={isLoading}/>
     <h1>Alunos</h1>
     <NewStudent to='/student'>Registrar novo aluno</NewStudent>
     <StudentsContainer>
       {students.map((student, index) => (
         <div key={String(student.id)}>
           <PhotosContainer>{get(student, 'Photos[0].url', false) ? (<img src={student.Photos[0].url} alt='' />) : (<FaUserCircle size={36} />)}</PhotosContainer>
           <span>{student.name}</span>
           <span>{student.surname}</span>
           <span>{student.email}</span>
           <Link to={`/student/${student.id}/edit`}><FaEdit size={16} /></Link>
           <Link to={`/student/${student.id}/delete`} onClick={handleDeleteAsk}><FaWindowClose size={16} /></Link>
           <FaExclamation cursor='pointer' display='none' size={16} onClick={e => handleDelete(e, student.id, index)} />
         </div>
       ))}
     </ StudentsContainer>
  </ Container>
  );
};
