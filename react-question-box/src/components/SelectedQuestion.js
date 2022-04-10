import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';

export default function SelectedQuestion(token) {
  const params = useParams();
  const [q, setQ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`https://questionbox-rocket.herokuapp.com/question/${params.Q_id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setQ(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [params.Q_id, token]);

  if (!token) return <Navigate to='/' />;

  return (
    <>
      <Link to={`/question/${params.Q_id}/new-answer`}>Submit New Answer</Link>
      {isLoading ? (
        <>
          <h1>LOADING</h1>
          <h1>{`${error}`}</h1>
        </>
      ) : (
        <div className='question-box'>
          <h4>{`${q.user}'s question:`}</h4>
          <h2>{q.question}</h2>
          <>
            <Link to={`/question/${params.Q_id}/new-answer`}>
              Submit New Answer
            </Link>
            <div className='answer-box'>
              {q.answers.map((a, key) => {
                return (
                  <>
                    <h4>
                      <p>{`${a.user}`}</p>
                    </h4>
                    <h4>'s answer</h4>
                    <p>{a.answer}</p>
                    {!a.accepted ? (
                      <p
                        style={{ color: 'red' }}
                      >{`<img><empty-checkmark></img>`}</p>
                    ) : (
                      <p
                        style={{ color: 'green' }}
                      >{`<img><filled-checkmark></img>`}</p>
                    )}
                  </>
                );
              })}
            </div>
          </>
        </div>
      )}
      <Link to='/'>See All Questions</Link>
    </>
  );
}
