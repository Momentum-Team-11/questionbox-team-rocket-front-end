import { useState } from 'react';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Questions from './Questions.js';

const App = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [home, setHome] = useState(true);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const handleLogin = (event) => {
    console.log('Handle Login Called');
    event.preventDefault();
    setHome(false);
    setLogin(true);
  };

  const handleRegister = (event) => {
    console.log('Handle Register Called');
    event.preventDefault();
    setHome(false);
    setRegister(true);
  };

  const setAuth = (username, token) => {
    setUsername(username);
    setToken(token);
  };

  return (
    <>
      {!token ? (
        <>
          <header>
            <h1>QuestionBox</h1>
          </header>
          {home ? (
            <>
              <div className='auth-buttons'>
                <form onClick={handleLogin}>
                  <button type='button'>Login</button>
                </form>
                <form onClick={handleRegister}>
                  <button type='button'>Register</button>
                </form>
              </div>
            </>
          ) : (
            <>
              {login && (
                <Login
                  setAuth={setAuth}
                  setLogin={setLogin}
                  setRegister={setRegister}
                />
              )}
              {register && (
                <Register
                  setAuth={setAuth}
                  setLogin={setLogin}
                  setRegister={setRegister}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <>
            <Questions username={username} token={token} setToken={setToken} />
          </>
        </>
      )}
    </>
  );
};

export default App;
