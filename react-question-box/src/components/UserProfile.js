import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function UserProfile({ username, token }) {
  const [answers, setAnswers] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favQs, setFavQs] = useState(null);

  useEffect(() => {
    axios
      .get('https://questionbox-rocket.herokuapp.com/questions/favorited/', {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log('Get Favorited Questions Called');
        console.log(res.data);
        setFavQs(res.data);
      })
      .catch((e) => {
        setError(e.message);
        console.log(error);
      })
      .then(() => {
        axios
          .get('https://questionbox-rocket.herokuapp.com/questions/user', {
            headers: { Authorization: `Token ${token}` },
          })
          .then((res) => {
            console.log('Get Questions Called');
            console.log(res.data);
            setQuestions(res.data);
          })
          .catch((e) => {
            setError(e.message);
          });
      })
      .then(() => {
        axios
          .get('https://questionbox-rocket.herokuapp.com/answers/user', {
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
      });
  }, [error, token]);

  if (!token) return <Navigate to='/' />;

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <>
        <h2>{`${username}'s Profile`}</h2>
        <Link to='/'>Return to Questions</Link>
        <br></br>
        <br></br>
        <h3>Your Favorited Questions:</h3>
        {favQs.length === '0' ? (
          <>
            {favQs.map((q, key) => {
              return (
                <div className='question-box'>
                  <Link to={`/question/${q.pk}`}>
                    {q.title}
                    <br></br>
                    {q.question}
                  </Link>
                  <br></br>
                  <br></br>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <p>You haven't added any questions to your favorites yet...</p>
            <Link to='/'>Find a question that you like!</Link>
          </>
        )}
        <hr></hr>
        <h3>Questions You've Asked:</h3>
        {questions ? (
          <>
            {questions.map((q, key) => {
              return (
                <div className='question-box'>
                  <Link to={`/question/${q.pk}`}>
                    {q.title}
                    <br></br>
                    {q.question}
                  </Link>
                  <br></br>
                  <br></br>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h2>You haven't asked any questions yet...</h2>
            <Link to='/new-question'>Ask your first Question!</Link>
          </>
        )}
        <hr></hr>
        <h3>Your Answers:</h3>
        {answers ? (
          <>
            {answers.map((a, key) => {
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
                  <br></br>
                </>
              );
            })}
            <Link to='/'>See All Questions</Link>
          </>
        ) : (
          <>
            <h2>You haven't answered any questions yet...</h2>
            <Link to='/'>Find a question to answer!</Link>
          </>
        )}
      </>
    );
  }
}
