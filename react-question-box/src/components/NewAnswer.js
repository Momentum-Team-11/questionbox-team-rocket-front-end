import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';

export default function NewAnswer({ token }) {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');

  const handleAnswer = (event) => {
    console.log('Handle Answer Called');
    event.preventDefault();
    axios
      .post(
        'https://questionbox-rocket.herokuapp.com/answers/',
        {
          answer: newAnswer,
          question: params.Q_id,
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

  if (!token) return <Navigate to='/' />;

  if (error) {
    return <h1>{`${error}`}</h1>;
  }

  return (
    <>
      <h2 className='title has-text-centered'>New Answer</h2>
      <form className='is-centered mx-6' onSubmit={handleAnswer}>
        <div className='field'>
          <label className='label' htmlFor='new-answer'>
            Answer:
          </label>
          <div className='control'>
            <textarea
              type='text'
              className='textarea'
              id='new-answer'
              height='50'
              size='50'
              placeholder='Enter your answer here!'
              required
              value={newAnswer}
              onChange={(event) => setNewAnswer(event.target.value)}
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
            <Link className='button is-warning' to={`/question/${params.Q_id}`}>
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
