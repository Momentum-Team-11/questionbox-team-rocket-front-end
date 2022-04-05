import { useState } from 'react';
import Login from './components/Login.js';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <>
      <Login setToken={setToken} />
    </>
  );
};

export default App;
