import { useState } from 'react';
import { requestReg } from '../ajax-requests';

export default function Register({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [nomatch, setNoMatch] = useState(false);

  const handleReg = (event) => {
    console.log('Handle Reg Called');
    event.preventDefault();
    console.log(username, password, repassword);
    if (password === repassword) {
      setNoMatch(false);
      requestReg(username, password, repassword)
        .then((res) => {
          setAuth(username, res.auth_token);
        })
        .catch((error) => setError(error.message));
    } else {
      setNoMatch(true);
    }

    // axios
    //   .post(urlToRegister, {
    //     username: username,
    //     password: password,
    //     repassword: repassword,
    //   })
    //   .then((res) => setAuth(res.data.auth_token, username));
  };

  return (
    <>
      <hr></hr>
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
    </>
  );
}
