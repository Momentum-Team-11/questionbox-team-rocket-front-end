import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Questions({ username, token, setAuth }) {
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
        <div className='container mt-3'>
          <div className='columns is-centered'>
            <div className='column is-two-thirds'>
              <div className='questions-container'>
                <h2 className='title has-text-centered'>Questions</h2>
                <div className='field is-grouped is-grouped-centered'>
                  <Link className='button' to='/new-question'>
                    New Question
                  </Link>
                </div>
                {questions.map((q, key) => {
                  const Q_id = q.pk;
                  return (
                    <div className='question-box'>
                      <br></br>
                      <div className='is-flex'>
                        {q.favorited.length === 0 ? (
                          <i // onClick={[handleFavorite, setFavorite(q.pk)]}
                            className='fa fa-regular fa-star'
                          ></i>
                        ) : (
                          <></>
                        )}
                        {q.favorited.map((f, key) => {
                          if (f === username) {
                            return (
                              <span className='is-icon is-small is-left'>
                                <i // onClick={[handleFavorite, setFavorite(q.pk)]}
                                  className='fa fa-solid fa-star'
                                ></i>
                              </span>
                            );
                          } else {
                            return (
                              <i // onClick={[handleFavorite, setFavorite(q.pk)]}
                                className='fa fa-regular fa-star'
                              ></i>
                            );
                          }
                        })}
                        <div>
                          <Link to={`/question/${Q_id}`}>
                            <h3 className='is-size-4'>{q.title}</h3>
                            <h4>{q.question}</h4>
                          </Link>
                          <p>{`by ${q.user}`}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
