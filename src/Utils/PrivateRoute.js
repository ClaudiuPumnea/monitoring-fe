import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { getToken } from './Common';

const PrivateRoute = () => {
  const isAuth = getToken();
  return isAuth ? (
    <div>
      <Navbar />
      <Outlet />{' '}
    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
