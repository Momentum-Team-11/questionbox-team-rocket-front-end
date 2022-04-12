import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [nomatch, setNoMatch] = useState(false);
  const [isRegistered, setIsRegistered] = useState('');
  const navigate = useNavigate();

  const handleReg = (event) => {
    console.log('Handle Reg Called');
    event.preventDefault();
    setError('');
    console.log(username, password, repassword);
    if (password === repassword) {
      axios
        .post('https://questionbox-rocket.herokuapp.com/auth/users/', {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          setIsRegistered(res.data.username);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
        });
    } else {
      setNoMatch(true);
    }
  };

  if (error) {
    return <h1>{`${error}`}</h1>;
  } else if (isRegistered) {
    return navigate('/');
  }

  return (
    <>
      <div className='hero is-warning is-small'>
        <h1 className='hero-body title has-text-centered has-text-weigh-bold'>
          QuestionBox
        </h1>
      </div>
      <h2 className='title has-text-centered'>Register</h2>
      <form className='is-centered mx-6' onSubmit={handleReg}>
        <div className='field'>
          <label className='label' htmlFor='reg-username'>
            username:{' '}
          </label>
          <div className='control'>
            <input
              type='text'
              className='input'
              id='reg-username'
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label' htmlFor='reg-password'>
            password:{' '}
          </label>
          <div className='control'>
            <input
              type='password'
              className='input'
              id='reg-password'
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          {nomatch && <div className='error'>The passwords do not match!</div>}
          <label className='label' htmlFor='reg-repassword'>
            retype password:{' '}
          </label>
          <div className='control'>
            <input
              type='password'
              className='input'
              id='reg-repassword'
              required
              value={repassword}
              onChange={(event) => setRePassword(event.target.value)}
            />
          </div>
        </div>
        <div className='field is-grouped is-grouped-centered'>
          <div className='control'>
            <button className='button is-success' type='submit'>
              Register
            </button>
          </div>
          <div className='control'>
            <Link className='button is-link' to='/login'>
              Go to Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
