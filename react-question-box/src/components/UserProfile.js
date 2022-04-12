import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function UserProfile({ username, token }) {
  const [answers, setAnswers] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://questionbox-rocket.herokuapp.com/questions/')
      .then((res) => {
        console.log('Get Questions Called');
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://questionbox-rocket.herokuapp.com/answers', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log('Get Answers Called');
        console.log(res.data);
        setAnswers(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [token]);

  if (!token) return <Navigate to='/' />;

  if (error) {
    return <h1>{`${error}`}</h1>;
  }

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <>
        <h2>{username}</h2>
        <Link to='/'>Return to Questions</Link>
        <h3>Your Questions:</h3>
        {questions.map((q, key) => {
          if (q.user === username) {
            return (
              <div className='question-box'>
                <Link to={`/question/${q.pk}`}>{q.question}</Link> <br></br>
                <br></br>
              </div>
            );
          }
          return null;
        })}
        <hr></hr>
        <h3>Your Answers:</h3>
        {answers.map((a, key) => {
          if (a.user === username) {
            return (
              <>
                <Link to={`/question/${a.question}`}>
                  {questions.map((q, key) => {
                    if (q.pk === a.question) {
                      return (
                        <>
                          <p>
                            <i>{`for question "${q.title}"`}</i>
                          </p>
                        </>
                      );
                    }
                    return null;
                  })}
                  <h4>{`${a.user}'s answer`}</h4>
                  <p>{a.answer}</p>
                  {!a.accepted ? (
                    <p style={{ color: 'red' }}>not best...</p>
                  ) : (
                    <p style={{ color: 'green' }}>BEST!</p>
                  )}
                </Link>
              </>
            );
          }
          return null;
        })}
        <Link to='/'>See All Questions</Link>
      </>
    );
  }
}
