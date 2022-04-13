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
      <div className='container mt-3'>
        <div className='columns is-centered'>
          <div className='column is-two-thirds'>
            <h2 className='title has-text-centered has-text-weight-bold'>{`${username}'s Profile`}</h2>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <Link
                  className='button is-primary is-rounded is-light is-outlined'
                  to='/'
                >
                  See All Questions
                </Link>
              </div>
            </div>
            <br></br>
            <br></br>
            <h3 className='is-size-4 has-text-weight-medium has-text-centered'>
              Your Favorited Questions:
            </h3>
            <div className='questions-container'>
              {favQs.length === '0' ? (
                <>
                  {favQs.map((q, key) => {
                    return (
                      <div className='question-box'>
                        <Link className='is-size-4' to={`/question/${q.pk}`}>
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
                  <p className='has-text-centered'>
                    You haven't added any questions to your favorites yet...
                  </p>
                  <div className='field is-grouped is-grouped-centered mt-3'>
                    <div className='control'>
                      <Link
                        className='button is-primary is-rounded is-outlined is-light'
                        to='/'
                      >
                        Find a question that you like!
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            <hr></hr>
            <h3 className='is-size-4 has-text-weight-medium has-text-centered'>
              Questions You've Asked:
            </h3>
            {questions ? (
              <>
                {questions.map((q, key) => {
                  return (
                    <div className='question-box'>
                      <div className='is-flex'>
                        {q.favorited.includes(username) ? (
                          <span className='is-icon is-small is-left'>
                            <i // onClick={[handleFavorite, setFavorite(q.pk)]}
                              className='fa fa-solid fa-star'
                            ></i>
                          </span>
                        ) : (
                          <i // onClick={[handleFavorite, setFavorite(q.pk)]}
                            className='fa fa-regular fa-star'
                          ></i>
                        )}
                        <div>
                          <Link className='is-size-4' to={`/question/${q.pk}`}>
                            {q.title}
                          </Link>
                          <br></br>
                          <Link to={`/question/${q.pk}`}>{q.question}</Link>
                        </div>
                      </div>
                      <br></br>
                      <br></br>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <p className='has-text-centered'>
                  You haven't asked any questions yet...
                </p>
                <div className='field is-grouped is-grouped-centered mt-3'>
                  <div className='control'>
                    <Link
                      className='button is-small is-rounded is-outlined is-light'
                      to='/new-question'
                    >
                      Ask your first Question!
                    </Link>
                  </div>
                </div>
              </>
            )}
            <hr></hr>
            <h3 className='is-size-4 has-text-weight-medium has-text-centered'>
              Your Answers:
            </h3>
            {answers ? (
              <>
                {answers.map((a, key) => {
                  return (
                    <>
                      <div className='box'>
                        <div className='is-flex'>
                          <div className='pr-4 pt-1'>
                            {!a.accepted ? (
                              <i className='fa-regular fa-square-check'></i>
                            ) : (
                              <i className='fa-solid fa-square-check'></i>
                            )}
                          </div>
                          <Link to={`/question/${a.question}`}>
                            {questions.map((q, key) => {
                              if (q.pk === a.question) {
                                return (
                                  <>
                                    <p className='has-text-grey has-text-weight-bold'>
                                      {`for question "${q.title}":`}
                                    </p>
                                  </>
                                );
                              }
                              return null;
                            })}
                            <h4 className='is-italic has-text-grey'>{`${a.user}'s answer`}</h4>
                            <p className='has-text-weight-medium is-size-5 has-text-black'>
                              {a.answer}
                            </p>
                          </Link>
                          <br></br>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className='field is-grouped is-grouped-centered'>
                  <div className='control'>
                    <Link
                      className='button is-primary is-small is-rounded is-light is-outlined'
                      to='/'
                    >
                      See All Questions
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>You haven't answered any questions yet...</h2>
                <Link to='/'>Find a question to answer!</Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
