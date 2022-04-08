import { useState } from 'react';
import { requestLogin } from '../ajax-requests';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setAuth, setLogin, setRegister }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    console.log('Hangle Login Called');
    event.preventDefault();
    console.log(username, password);
    requestLogin(username, password)
      .then((res) => {
        setAuth(username, res.auth_token);
      })
      .catch((error) => setError(error.message));

    //   axios
    //     .post(heroku.app/question, {
    //       title: question,
    //       question:
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       setAuth(res.data.auth_token, username);
    //     });
    navigate('/');
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin} autoComplete='username'>
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
        <Link to='/register'>Go to Registration</Link>
      </div>
    </>
  );
}
