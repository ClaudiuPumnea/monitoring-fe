import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Reports from './pages/Reports';
import PrivateRoute from './Utils/PrivateRoute';
import Table from './pages/Table';

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
            <Route path='/reports' element={<Reports />} />
            <Route path='/table' element={<Table />} />
            <Route path='*' element={<Navigate to={'/home'} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
