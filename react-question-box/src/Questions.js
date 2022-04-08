import { useState } from 'react';
import sampleData from './sampleData';
import NewAnswer from './components/NewAnswer';
import NewQuestion from './components/NewQuestion';
import UserProfile from './components/UserProfile';
import { Link, useNavigate } from 'react-router-dom';

export default function Questions({ username, token, setToken }) {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [answerQuestion, setAnswerQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const handleUserProfile = (event) => {
    console.log('Hangle User Profile Called');
    event.preventDefault();
    setUserProfile(true);
  };

  const handleNewAnswer = (event) => {
    console.log('Handle New Answer Called');
    event.preventDefault();
    setAnswerQuestion(true);
    navigate('/new-question');
  };

  const handleReturn = (event) => {
    console.log('Handle Return Called');
    event.preventDefault();
    setSelectedQuestion(false);
    setUserProfile(false);
    navigate('/');
  };

  const handleLogOut = (event) => {
    console.log('Handle Log Out Called');
    event.preventDefault();
    setSelectedQuestion(false);
    setAnswerQuestion(false);
    setNewQuestion(false);
    setUserProfile(false);
    setToken('');
  };

  return (
    <>
      <header>
        <h1 className='title'>QuestionBox</h1>
        {!userProfile ? (
          <>
            <a href='#' onClick={handleUserProfile}>{`${username}`}</a>
            <br></br>
          </>
        ) : (
          <>
            <br></br>
          </>
        )}
        <div className='auth-buttons'>
          <form onSubmit={handleLogOut}>
            <button type='submit'>Log Out</button>
          </form>
        </div>
      </header>
      <div className='questions-container'>
        {!userProfile ? (
          <>
            {!selectedQuestion ? (
              <>
                <h2>Questions</h2>
                <Link to='/new-question'>New Question</Link>
                {sampleData.map((q, key) => {
                  return (
                    <div className='question-box'>
                      <h3 onClick={() => setSelectedQuestion(q)}>
                        {q.question}
                      </h3>
                      <a href='#'>{`${q.author}`}</a>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className='question-box'>
                <h2>{selectedQuestion.question}</h2>
                {answerQuestion ? (
                  <>
                    <NewAnswer setAnswerQuestion={setAnswerQuestion} />
                  </>
                ) : (
                  <>
                    <form onSubmit={handleNewAnswer}>
                      <button type='submit'>Answer Question</button>
                    </form>
                    <div className='answer-box'>
                      {selectedQuestion.answers.map((a, key) => {
                        return (
                          <>
                            <h4>{`${a.author}'s answer`}</h4>
                            <p>{a.answer}</p>
                            {!a.isBest ? (
                              <p style={{ color: 'red' }}>not best...</p>
                            ) : (
                              <p style={{ color: 'green' }}>BEST!</p>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <form onSubmit={handleReturn}>
                      <button type='submit'>See All Questions</button>
                    </form>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <UserProfile
              username={username}
              handleReturn={handleReturn}
              setUserProfile={setUserProfile}
              setSelectedQuestion={setSelectedQuestion}
            />
          </>
        )}
      </div>
    </>
  );
}
