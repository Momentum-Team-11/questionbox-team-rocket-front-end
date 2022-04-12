import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

export default function SelectedQuestion({ token, username }) {
  const navigate = useNavigate;
  const params = useParams();
  const [q, setQ] = useState(null);
  const [a, setA] = useState(null);
  const [currentA, setCurrentA] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // const [favorite, setFavorite] = useState(null);

  // const handleFavorite = (event) => {
  //   console.log('Handle Favorite Called');
  //   event.preventDefault();
  // axios
  //   .post(
  //     'https://questionbox-rocket.herokuapp.com/questions/favorited',
  //     {
  //       question: favorite,
  //     },
  //     {
  //       headers: { Authorization: `Token ${token}` },
  //     }
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //     setFavorite(null);
  //   })
  //   .catch((e) => setError(e.message));
  // if (error) {
  //   return error;
  // } else {
  //   console.log('Successfully favorited Question!');
  // }
  // };

  // const handleAcceptedAnswer = (event) => {
  //   console.log('Handle Accepted Answer Called');
  //   event.preventDefault();
  // axios
  //   .post(
  //     'https://questionbox-rocket.herokuapp.com/answers/accepted/',
  //     {
  //       pk: a
  //     },
  //     {
  //       headers: { Authorization: `Token ${token}` },
  //     }
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //     setA(null);
  //   })
  //   .catch((e) => setError(e.message));
  // if (error) {
  //   return error;
  // } else {
  //   console.log('Successfully Accepted Answer!');
  // }
  // };

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
        navigate('/');
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
        navigate(`/question/${params.Q_id}`);
      })
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    console.log(params);
    //   axios
    //     .get(
    //       `https://questionbox-rocket.herokuapp.com/questions/${params.Q_id}/`,
    //       {
    //         headers: {
    //           Authorization: `Token ${token}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       setQ(res.data);
    //       setIsLoading(false);
    //     })
    //     .catch((e) => {
    //       setError(e.message);
    //     });
    // }, [params.Q_id, token]);

    axios
      .get('https://questionbox-rocket.herokuapp.com/questions/')
      .then((res) => {
        console.log('Get Questions Called');
        console.log(res.data);
        setQ(res.data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .then(() => {
        axios
          .get('https://questionbox-rocket.herokuapp.com/answers/', {
            headers: { Authorization: `Token ${token}` },
          })
          .then((res) => {
            console.log('Get Answers Called');
            console.log(res.data);
            setA(res.data);
            setIsLoading(false);
          })
          .catch((e) => {
            setError(e.message);
          });
      });
  }, [error, params, token]);

  if (!token) return <Navigate to='/' />;

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <>
        {error && console.log(error)}
        {q.map((q, key) => {
          if (q.pk === Number(params.Q_id)) {
            return (
              <>
                <Link to={`/question/${params.Q_id}/new-answer`}>
                  Submit New Answer
                </Link>
                {isLoading ? (
                  <>
                    <h1>LOADING</h1>
                    <h1>{`${error}`}</h1>
                  </>
                ) : (
                  <div className='question-box'>
                    <h3>{`${q.title}`}</h3>
                    <h4>{`${q.user}'s question:`}</h4>
                    <h2>{q.question}</h2>
                    {q.favorited.length === 0 ? (
                      <p
                      // onClick={[handleFavorite, setFavorite(q.pk)]}
                      >{`<p>NOT favorited...</p>`}</p>
                    ) : (
                      <></>
                    )}
                    {q.favorited.map((f, key) => {
                      if (f === 2) {
                        return (
                          <p
                          // onClick={[handleFavorite, setFavorite(q.pk)]}
                          >{`<p>favorited</p>`}</p>
                        );
                      } else {
                        return (
                          <p
                          // onClick={[handleFavorite, setFavorite(q.pk)]}
                          >{`<p>NOT favorited...</p>`}</p>
                        );
                      }
                    })}
                    <Link to={`/question/${params.Q_id}/new-answer`}>
                      Submit New Answer
                    </Link>
                    <br></br>
                    {q.user === username ? (
                      <>
                        <form onSubmit={handleDeleteQuestion}>
                          <div className='field-controls'>
                            <button type='submit'>Delete Question</button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className='answer-box'>
                      {a.map((a, key) => {
                        if (a.question === Number(params.Q_id)) {
                          return (
                            <>
                              <h4>{`${a.user}'s answer`}</h4>
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
                              {a.user === username ? (
                                <>
                                  <Link
                                    to={`/question/${params.Q_id}/edit-answer/${a.pk}/`}
                                  >
                                    Edit Answer
                                  </Link>
                                  <form
                                    onSubmit={(event) => {
                                      setCurrentA(a.pk);
                                      handleDeleteAnswer(event);
                                    }}
                                  >
                                    <div className='field-controls'>
                                      <button type='submit'>
                                        Delete Answer
                                      </button>
                                    </div>
                                  </form>
                                </>
                              ) : (
                                <></>
                              )}
                              {q.user === username ? (
                                <>
                                  <form
                                  // onSubmit={[handleAcceptedAnswer(a.pk), setA(a.pk)]}
                                  >
                                    <div className='field-controls'>
                                      <button type='submit'>
                                        Accept as Best Answer
                                      </button>
                                    </div>
                                  </form>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
                <Link to='/'>See All Questions</Link>
              </>
            );
          }
          return null;
        })}
      </>
    );
  }
}
