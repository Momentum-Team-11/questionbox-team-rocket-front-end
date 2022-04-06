import { useState } from 'react';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Questions from './Questions.js';

const App = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const setAuth = (username, token) => {
    setUsername(username);
    setToken(token);
  };

  return (
    <>
      <Login setAuth={setAuth} />
      <Register setAuth={setAuth} />
      <Questions username={username} token={token} />
    </>
  );
};

export default App;
