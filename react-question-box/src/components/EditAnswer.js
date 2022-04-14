import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';

export default function EditAnswer({ token }) {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleAnswer = (event) => {
    console.log('Handle Answer Called');
    event.preventDefault();
    axios
      .patch(
        `https://questionbox-rocket.herokuapp.com/answers/${params.A_id}/`,
        {
          answer: answer,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log('Successfully submitted Answer!');
        console.log(res);
        navigate(`/question/${params.Q_id}`);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  useEffect(() => {
    axios
      .get(`https://questionbox-rocket.herokuapp.com/answers/${params.A_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAnswer(res.data.answer);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [params.A_id, token]);

  if (!token) return <Navigate to='/' />;

  if (error) {
    return <h1>{`${error}`}</h1>;
  }

  if (isLoading) {
    return <h1>LOADING!</h1>;
  } else {
    return (
      <>
        <h2 className='title has-text-centered'>Edit Answer</h2>
        <form className='is-centered mx-6' onSubmit={handleAnswer}>
          <div className='field'>
            <label className='label' htmlFor='edit-answer'>
              Answer:
            </label>
            <div className='control'>
              <textarea
                type='text'
                className='textarea'
                id='edit-answer'
                height='50'
                size='50'
                placeholder='You erased your answer...'
                required
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className='field is-grouped is-grouped-centered'>
            <div className='control'>
              <button className='button is-success' type='submit'>
                Submit Answer
              </button>
            </div>
            <div className='control'>
              <Link
                className='button is-warning'
                to={`/question/${params.Q_id}`}
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </>
    );
  }
}
