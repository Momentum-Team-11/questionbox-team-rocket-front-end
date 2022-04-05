import { useState } from 'react';
import { requestLogin } from '../ajax-requests';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    console.log('Hangle Login Called');
    event.preventDefault();
    console.log(username, password);
    requestLogin(username, password)
      .then((res) => setToken(res.auth_token))
      .catch((error) => setError(error.message));

    // axios
    //   .post(urlToLogin, {
    //     username: username,
    //     passowrd: password,
    //   })
    //   .then((res) => setToken(res.data.auth_token));
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='field-controls'>
          <label htmlFor='user-name'>username: </label>
          <input
            type='text'
            className='text-input'
            id='username'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <br></br>
          <label htmlFor='password'>password: </label>
          <input
            type='password'
            className='password-input'
            id='password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <button type='submit'>Log In</button>
        </div>
      </form>
    </>
  );
}
