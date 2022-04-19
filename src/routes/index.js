import React from 'react';
import {Switch} from 'react-router-dom';
import MyRoute from './MyRoute';
import Login from '../pages/login';
import Page404 from '../pages/page404';
import Photo from '../pages/photo';
import Register from '../pages/register';
import Student from '../pages/student';
import Students from '../pages/students';

export default function Router() {
  return (
    <Switch>
      <MyRoute exact path='/register/' component={Register} isClosed={false} />
      <MyRoute exact path='/login/' component={Login} isClosed={false} />
      <MyRoute exact path='/' component={Students} isClosed={false} />
      <MyRoute exact path='/student/' component={Student} isClosed />
      <MyRoute exact path='/student/:id/edit' component={Student} isClosed />
      <MyRoute exact path='/photo/:id' component={Photo} isClosed />
      <MyRoute path='*' component={Page404} />
    </Switch>
  );
};
