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
        'https://questionbox-rocket.herokuapp.com/answer/',
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
      <h2>New Answer</h2>
      <form onSubmit={handleAnswer}>
        <div className='field-controls'>
          <label htmlFor='new-answer'>Answer: </label>
          <input
            type='text'
            className='text-input'
            id='new-answer'
            height='50'
            size='50'
            required
            value={newAnswer}
            onChange={(event) => setNewAnswer(event.target.value)}
            autoFocus
          />
        </div>
        <div className='field-controls'>
          <button type='submit'>Submit Answer</button>
        </div>
        <div className='field-controls'>
          <Link to={`/question/${params.Q_id}`}>Cancel</Link>
        </div>
      </form>
    </>
  );
}
