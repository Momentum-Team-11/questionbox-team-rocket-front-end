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
        <div className='questions-container'>
          <h2>Questions</h2>
          <Link to='/new-question'>New Question</Link>
          {questions.map((q, key) => {
            const Q_id = q.pk;
            return (
              <div className='question-box'>
                <br></br>
                <Link to={`/question/${Q_id}`}>
                  <h3>{q.title}</h3>
                  <h4>{q.question}</h4>
                </Link>
                <p>{`${q.user}`}</p>
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
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
