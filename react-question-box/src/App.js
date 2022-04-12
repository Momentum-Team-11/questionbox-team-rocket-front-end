import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Questions from './Questions.js';
import NewQuestion from './components/NewQuestion.js';
import NewAnswer from './components/NewAnswer.js';
import UserProfile from './components/UserProfile.js';
import EditAnswer from './components/EditAnswer.js';
import useLocalStorageState from 'use-local-storage-state';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SelectedQuestion from './components/SelectedQuestion.js';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useLocalStorageState(
    'QuestionBoxUsername',
    ''
  );
  const [token, setToken] = useLocalStorageState('QuestionBoxToken', '');

  const setAuth = (username, token) => {
    setUsername(username);
    setToken(token);
  };

  const handleLogOut = (event) => {
    console.log('Handle Log Out Called');
    event.preventDefault();
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
        setAuth(null, null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isLoggedIn = username && token;

  return (
    <>
      <Router>
        {!token ? (
          <></>
        ) : (
          <>
            <header>
              <h1 className='title'>QuestionBox</h1>
              <Link to={`/${username}`}>{`${username}`}</Link>
              <br></br>
              <div className='auth-buttons'>
                <form onSubmit={handleLogOut}>
                  <button type='submit'>Log Out</button>
                </form>
              </div>
            </header>
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
