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
      <h2>Register</h2>
      <form onSubmit={handleReg}>
        <div className='field-controls'>
          <label htmlFor='reg-username'>username: </label>
          <input
            type='text'
            className='text-input'
            id='reg-username'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <br></br>
          <label htmlFor='reg-password'>password: </label>
          <input
            type='password'
            className='password-input'
            id='reg-password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <br></br>
          {nomatch && <div className='error'>The passwords do not match!</div>}
          <label htmlFor='reg-repassword'>retype password: </label>
          <input
            type='password'
            className='password-input'
            id='reg-repassword'
            required
            value={repassword}
            onChange={(event) => setRePassword(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <button type='submit'>Register</button>
        </div>
      </form>
      <div className='field-controls'>
        <Link to='/login'>Go to Login</Link>
      </div>
    </>
  );
}
