import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setAuth, setLogin, setRegister, isLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    console.log('Hangle Login Called');
    event.preventDefault();
    setError('');
    axios
      .post('https://questionbox-rocket.herokuapp.com/auth/token/login/', {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setAuth(username, res.data.auth_token);
      })
      .catch((e) => setError(e.message));
  };

  if (isLoggedIn) {
    return navigate('/');
  }

  return (
    <>
      <div className='hero is-warning is-small pb-4'>
        <Link to='/'>
          <h1 className='title is-1 has-text-centered has-text-weigh-bold mt-3'>
            QuestionBox
          </h1>
        </Link>
      </div>
      <h2 className='title has-text-centered'>Login</h2>
      {error && <h2>{error}</h2>}
      <form
        className='is-centered mx-6'
        onSubmit={handleLogin}
        autoComplete='username'
      >
        <div className='field'>
          <label className='label' htmlFor='login-username'>
            username:
          </label>
          <div className='control'>
            <input
              type='text'
              className='input'
              id='login-username'
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label' htmlFor='login-password'>
            password:
          </label>
          <div className='control'>
            <input
              type='password'
              className='input'
              id='login-password'
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className='field is-grouped is-grouped-centered'>
          <div className='control'>
            <button className='button is-success' type='submit'>
              Log In
            </button>
          </div>
          <div className='control'>
            <Link className='button is-link' to='/register'>
              Go to Registration
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
