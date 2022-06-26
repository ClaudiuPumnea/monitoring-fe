import './Login.css';

import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';

import { setUserSession } from './../../Utils/Common';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const navigate = useNavigate();
  const handleSubmit = () => {
    setError(null);
    setLoading(true);

    var config = {
      method: 'post',
      url: 'http://localhost:3050/auth/login',
      headers: {
        Authorization: 'Bearer null',
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        navigate('/home');
      })
      .catch(function (error) {
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          if (error.response.status === 404) {
            setError('User not found');
          } else {
            setError('Something went wrong. Please try again later.');
          }
        }
      });
  };
  return (
    <div className='Login'>
      Login <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group size='lg' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <div className='error'>{error}</div>}
        <Button
          block='true'
          size='lg'
          value={loading ? 'Loading..' : 'Login'}
          onClick={handleSubmit}
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
