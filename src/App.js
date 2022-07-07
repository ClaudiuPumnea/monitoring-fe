import './App.css';

import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Apartments from './pages/Apartments';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Table from './pages/Table';
import PrivateRoute from './Utils/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={
              sessionStorage.getItem('user') == null ? (
                <Login />
              ) : (
                <Navigate to={'/home'} />
              )
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            {/* <Route path='/reports' element={<Reports />} /> */}
            <Route path='/users' element={<Table />} />
            <Route path='/apartments' element={<Apartments />} />

            <Route path='*' element={<Navigate to={'/home'} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
