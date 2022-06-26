import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import { getToken } from './Common';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        !getToken() ? <Component {...props} /> : <Navigate to='/home' />;
      }}
    />
  );
};

export default PublicRoute;
