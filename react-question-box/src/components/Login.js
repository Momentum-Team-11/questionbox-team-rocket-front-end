import { useState } from 'react';
import { requestLogin } from '../ajax-requests';

export default function Login({ setAuth, setLogin, setRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (event) => {
    console.log('Handle Go to Register Called');
    event.preventDefault();
    setLogin(false);
    setRegister(true);
  };

  const handleLogin = (event) => {
    console.log('Hangle Login Called');
    event.preventDefault();
    console.log(username, password);
    requestLogin(username, password)
      .then((res) => {
        setAuth(username, res.auth_token);
      })
      .catch((error) => setError(error.message));

    // axios
    //   .post(urlToLogin, {
    //     username: username,
    //     passowrd: password,
    //   })
    //   .then((res) => setAuth(res.data.auth_token, username));
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='field-controls'>
          <label htmlFor='login-username'>username: </label>
          <input
            type='text'
            className='text-input'
            id='login-username'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <br></br>
          <label htmlFor='login-password'>password: </label>
          <input
            type='password'
            className='password-input'
            id='login-password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <button type='submit'>Log In</button>
        </div>
      </form>
      <div className='field-controls'>
        <form onClick={handleRegister}>
          <button type='button'>Go to Registration</button>
        </form>
      </div>
    </>
  );
}
