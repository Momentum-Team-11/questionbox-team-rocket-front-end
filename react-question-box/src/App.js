import { useState } from 'react';
import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Questions from './Questions.js';
import NewQuestion from './components/NewQuestion.js';
import NewAnswer from './components/NewAnswer.js';
import UserProfile from './components/UserProfile.js';
import EditAnswer from './components/EditAnswer.js';
import useLocalStorageState from 'use-local-storage-state';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';
import SelectedQuestion from './components/SelectedQuestion.js';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate;
  const [username, setUsername] = useLocalStorageState(
    'QuestionBoxUsername',
    ''
  );
  const [token, setToken] = useLocalStorageState('QuestionBoxToken', '');
  const [status, setStatus] = useState(null);
  // const [error, setError] = useState('');

  const setAuth = (username, token) => {
    setUsername(username);
    setToken(token);
  };

  const handleLogOut = (event) => {
    console.log('Handle Log Out Called');
    event.preventDefault();
    setStatus(null);
    axios
      .post(
        'https://questionbox-rocket.herokuapp.com/auth/token/logout/',
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setStatus(res.status);
        setAuth(null, null);
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        setStatus(e.status);
        setAuth(null, null);
        navigate('/');
      });
  };

  if (status === 401) {
    setAuth(null, null);
  }

  const isLoggedIn = username && token;

  return (
    <>
      <Router>
        {!token ? (
          <></>
        ) : (
          <>
            <div className='hero is-warning is-small'>
              <Link to='/'>
                <h1 className='title is-1 has-text-centered has-text-weigh-bold mt-3'>
                  QuestionBox
                </h1>
              </Link>
              <h2 className='mr-5 pr-4 has-text-right is-size-4'>{`${username}`}</h2>
              <div className='mr-4 pr-5 field is-grouped is-grouped-right'>
                <Link
                  className=' button is-link is-small is-dark'
                  to={`/${username}`}
                >
                  <p className='mr-1 ml-2'>Profile</p>
                </Link>
              </div>
              <div className='auth-buttons'>
                <form
                  className='mr-4 pr-5 field is-grouped is-grouped-right'
                  onSubmit={handleLogOut}
                >
                  <button
                    className='button is-danger is-small is-dark mb-3'
                    type='submit'
                  >
                    Log Out
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
        <Routes>
          <Route
            path='/'
            element={
              <>
                {!token ? (
                  <>
                    <Landing />
                  </>
                ) : (
                  <>
                    <Questions
                      username={username}
                      token={token}
                      setAuth={setAuth}
                    />
                  </>
                )}
              </>
            }
          ></Route>
          <Route path='/new-question' element={<NewQuestion token={token} />} />
          <Route
            path='/question/:Q_id'
            element={<SelectedQuestion token={token} username={username} />}
          />
          <Route
            path='/question/:Q_id/new-answer'
            element={<NewAnswer token={token} />}
          />
          <Route
            path='/question/:Q_id/edit-answer/:A_id'
            element={<EditAnswer token={token} />}
          />
          <Route
            path='/:username'
            element={<UserProfile username={username} token={token} />}
          />
          <Route
            path='/login'
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />}
          />
          <Route path='/register' element={<Register setAuth={setAuth} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
