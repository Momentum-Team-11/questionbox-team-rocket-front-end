import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

export default function SelectedQuestion({ token, username }) {
  const navigate = useNavigate;
  const params = useParams();
  const [q, setQ] = useState(null);
  const [currentA, setCurrentA] = useState('');
  const [accepted, setAccepted] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // const [favorite, setFavorite] = useState(null);
  // const [newFavArray, setNewFavArray] = useState(null);

  const handleFavorite = (event) => {
    console.log('Handle Favorite Called');
  };

  const handleUnFavorite = (event) => {
    console.log('Handle UnFavorite Called');

    // q.favorited.map((f, idx) => {
    //   if (f === username) {
    //     return setFavorite(favorite.splice(idx, 1));
    //   }
    //   return null;
    // });
    // console.log(favorite);
    // axios
    //   .patch(
    //     `https://questionbox-rocket.herokuapp.com/questions/${params.Q_id}`,
    //     {
    //       favorited: favorite,
    //     },
    //     {
    //       headers: { Authorization: `Token ${token}` },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setFavorite(null);
    //     console.log('Successfully UnFavorited Question!');
    //     setIsLoading(true);
    //     return navigate(`/question/${params.Q_id}`);
    //   })
    //   .catch((e) => setError(e.message));
  };

  const handleAcceptedAnswer = (event) => {
    console.log('Handle Accepted Answer Called');
    console.log(currentA);
    console.log(accepted);
    event.preventDefault();
    axios
      .patch(
        `https://questionbox-rocket.herokuapp.com/answers/${currentA}/`,
        {
          accepted: accepted,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully changed Accepted Answer state');
        console.log(res.data);
        setCurrentA(null);
        setAccepted(null);
        setIsLoading(true);
        return navigate(`/question/${params.Q_id}`);
      })
      .catch((e) => setError(e.message));
  };

  const handleDeleteQuestion = (event) => {
    console.log('Handle Delete Question Called');
    event.preventDefault();
    axios
      .delete(
        `https://questionbox-rocket.herokuapp.com/questions/${params.Q_id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(true);
        return navigate('/');
      })
      .catch((e) => setError(e.message));
  };

  const handleDeleteAnswer = (event) => {
    console.log('Handle Delete Answer Called');
    console.log(currentA);
    event.preventDefault();
    axios
      .delete(`https://questionbox-rocket.herokuapp.com/answers/${currentA}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        console.log(`Successfully Deleted Answer!`);
        setCurrentA('');
        setIsLoading(true);
        return navigate(`/question/${params.Q_id}`);
      })
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    console.log(params);

    axios
      .get(`https://questionbox-rocket.herokuapp.com/questions/${params.Q_id}`)
      .then((res) => {
        console.log('Get Questions Called');
        console.log(res.data);
        setQ(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [error, params, token]);

  if (!token) return <Navigate to='/' />;

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <>
        <div className='container mt-3'>
          <div className='columns is-centered'>
            <div className='column is-two-thirds'>
              {isLoading ? (
                <>
                  <h1>LOADING</h1>
                  <h1>{`${error}`}</h1>
                </>
              ) : (
                <div className='question-box'>
                  <div className='field is-grouped is-grouped-centered mt-4'>
                    <div className='control'>
                      <Link
                        className='button is-large is-primary is-rounded is-light is-outlined'
                        to='/'
                      >
                        See All Questions
                      </Link>
                    </div>
                  </div>
                  <br></br>
                  <div className='is-flex is-flex-wrap-wrap is-justify-content-center is-align-content-center pr-5'>
                    {q.favorited.includes(username) ? (
                      <span className='is-icon is-large is-left'>
                        <i
                          onClick={(event) => {
                            // setFavorite(q.favorited);
                            handleUnFavorite(event);
                          }}
                          className='fa fa-solid fa-star is-size-3'
                        ></i>
                      </span>
                    ) : (
                      <i
                        onClick={(event) => {
                          // setFavorite(q.favorited);
                          handleFavorite(event);
                        }}
                        className='fa fa-regular fa-star is-size-3'
                      ></i>
                    )}
                    <div>
                      <h3 className='title has-text-centered has-text-weight-bold'>{`${q.title}`}</h3>
                      <h4 className='has-text-grey has-text-weight-medium is-italic is-size-5 ml-3'>{`${q.user}'s question:`}</h4>
                      <h2 className='is-size-3 has-text-weight-medium button is-active is-warning'>
                        {q.question}
                      </h2>
                      {q.user === username ? (
                        <>
                          <form onSubmit={handleDeleteQuestion}>
                            <div className='field is-grouped is-grouped-centered ml-3 pt-3'>
                              <div className='control'>
                                <button
                                  className='button is-danger is-light is-outlined'
                                  type='submit'
                                >
                                  Delete Question
                                </button>
                              </div>
                            </div>
                          </form>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <br></br>
                  <h2 className='is-size-4 has-text-weight-medium'>
                    Best Answers
                  </h2>
                  {q.answers.map((a, key) => {
                    if (a.question === Number(params.Q_id)) {
                      return (
                        <>
                          {a.accepted ? (
                            <>
                              <div>
                                <div className='box'>
                                  <div className='is-flex'>
                                    <div className='pr-4 pt-2'>
                                      {q.user === username && (
                                        <>
                                          {!a.accepted ? (
                                            <i
                                              className='fa-regular fa-square-check is-size-4'
                                              onClick={(event) => {
                                                setCurrentA(a.pk);
                                                setAccepted(true);
                                                handleAcceptedAnswer(
                                                  event,
                                                  a.pk
                                                );
                                              }}
                                            ></i>
                                          ) : (
                                            <i
                                              className='fa-solid fa-square-check is-size-4'
                                              onClick={(event) => {
                                                setCurrentA(a.pk);
                                                setAccepted(false);
                                                handleAcceptedAnswer(
                                                  event,
                                                  a.pk
                                                );
                                              }}
                                            ></i>
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className='is-italic has-text-grey'>{`${a.user}'s answer`}</h4>
                                      <p className='has-text-weight-medium is-size-5'>
                                        {a.answer}
                                      </p>
                                      {a.user === username ? (
                                        <>
                                          <div className='field is-grouped is-grouped-centered'>
                                            <div className='control'>
                                              <Link
                                                className='button is-link is-small is-outlined is-light'
                                                to={`/question/${params.Q_id}/edit-answer/${a.pk}/`}
                                              >
                                                Edit Answer
                                              </Link>
                                            </div>
                                            <div className='control'>
                                              <form
                                                onSubmit={(event) => {
                                                  setCurrentA(a.pk);
                                                  handleDeleteAnswer(event);
                                                }}
                                              >
                                                <button
                                                  className='button is-danger is-small is-outlined is-light'
                                                  type='submit'
                                                >
                                                  Delete Answer
                                                </button>
                                              </form>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <br></br>
                        </>
                      );
                    }
                    return null;
                  })}
                  <br></br>
                  <div className='field is-grouped is-grouped-centered'>
                    <Link
                      className='button is-info is-light is-outlined'
                      to={`/question/${params.Q_id}/new-answer`}
                    >
                      Submit New Answer
                    </Link>
                  </div>
                  <br></br>
                  <br></br>
                  <div className='answer-box'>
                    <h3 className='is-size-4 has-text-weight-medium'>
                      Answers
                    </h3>
                    {q.answers.map((a, key) => {
                      if (a.question === Number(params.Q_id)) {
                        return (
                          <>
                            {!a.accepted ? (
                              <div className='box'>
                                <div className='is-flex'>
                                  <div className='pr-4 pt-1'>
                                    {q.user === username && (
                                      <>
                                        {!a.accepted ? (
                                          <i
                                            className='fa-regular fa-square-check is-size-4'
                                            onClick={(event) => {
                                              setCurrentA(a.pk);
                                              setAccepted(true);
                                              handleAcceptedAnswer(event, a.pk);
                                            }}
                                          ></i>
                                        ) : (
                                          <i
                                            className='fa-solid fa-square-check is-size-4'
                                            onClick={(event) => {
                                              setCurrentA(a.pk);
                                              setAccepted(false);
                                              handleAcceptedAnswer(event, a.pk);
                                            }}
                                          ></i>
                                        )}
                                      </>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className='is-italic has-text-grey'>{`${a.user}'s answer`}</h4>
                                    <p className='has-text-weight-medium is-size-5'>
                                      {a.answer}
                                    </p>
                                    {a.user === username ? (
                                      <>
                                        <div className='field is-grouped is-grouped-centered'>
                                          <div className='control'>
                                            <Link
                                              className='button is-link is-small is-outlined'
                                              to={`/question/${params.Q_id}/edit-answer/${a.pk}/`}
                                            >
                                              Edit Answer
                                            </Link>
                                          </div>
                                          <div className='control'>
                                            <form
                                              onSubmit={(event) => {
                                                setCurrentA(a.pk);
                                                handleDeleteAnswer(event);
                                              }}
                                            >
                                              <button
                                                className='button is-danger is-small is-outlined'
                                                type='submit'
                                              >
                                                Delete Answer
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                            <br></br>
                          </>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
              <div className='field is-grouped is-grouped-centered'>
                <div className='control'>
                  <Link
                    className='button is-primary is-rounded is-outlined is-light'
                    to='/'
                  >
                    See All Questions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
