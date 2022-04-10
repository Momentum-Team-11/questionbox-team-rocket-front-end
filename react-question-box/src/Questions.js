import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Questions({ username, token, setAuth }) {
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://questionbox-rocket.herokuapp.com/questions/')
      .then((res) => {
        console.log('Get Questions Called');
        setQuestions(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <>
        {error && <h3>{error}</h3>}
        <div className='questions-container'>
          <h2>Questions</h2>
          <Link to='/new-question'>New Question</Link>
          {questions.map((q, key) => {
            const Q_id = key;
            return (
              <div className='question-box'>
                <Link to={`/question/${Q_id}`}>
                  <h3>{q.title}</h3>
                  <h4>{q.question}</h4>
                </Link>
                <p>{`${q.user}`}</p>
                {q.favorited.map((f, key) => {
                  return (
                    <>
                      {q.favorited ? (
                        <p>{`<p>favorited</p>`}</p>
                      ) : (
                        <p>{`<p>NOT favorited...</p>`}</p>
                      )}
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
