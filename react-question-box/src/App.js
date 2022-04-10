import Landing from './components/Landing.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Questions from './Questions.js';
import NewQuestion from './components/NewQuestion.js';
import NewAnswer from './components/NewAnswer.js';
import UserProfile from './components/UserProfile.js';
import useLocalStorageState from 'use-local-storage-state';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectedQuestion from './components/SelectedQuestion.js';

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

  const isLoggedIn = username && token;

  return (
    <>
      <Router>
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
            element={<SelectedQuestion token={token} />}
          />
          <Route
            path='/question/:Q_id/new-answer'
            element={<NewAnswer token={token} />}
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
