import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sampleData from '../sampleData';

export default function UserProfile({ username, token }) {
  const [answers, setAnswers] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://questionbox-rocket.herokuapp.com/answers', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setAnswers(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [token]);

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
        {sampleData.map((q, key) => {
          if (q.author === username) {
            return (
              <div className='question-box'>
                <Link to={`/question/${q.id}`}>{q.question}</Link> <br></br>
                <Link to={`/${q.author}`}>{`${q.author}`}</Link>
              </div>
            );
          }
        })}
        <hr></hr>
        <h3>Your Answers:</h3>
        {answers.map((a, key) => {
          return (
            <>
              <Link to={`/question/${a.question}`}>
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
        })}
      </>
    );
  }
}
