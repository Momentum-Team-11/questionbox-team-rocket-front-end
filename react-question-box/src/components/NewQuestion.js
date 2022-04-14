import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

export default function NewQuestion({ token }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const handleQuestion = (event) => {
    console.log('Handle Question Called');
    event.preventDefault();
    axios
      .post(
        'https://questionbox-rocket.herokuapp.com/questions/',
        {
          title: title,
          question: question,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => setError(e.message));
    if (error) {
      return error;
    } else {
      console.log('Successfully submitted Question!');
      navigate('/');
    }
  };

  if (!token) return <Navigate to='/' />;

  return (
    <>
      <h2 className='title has-text-centered'>New Question</h2>
      <form className='is-centered mx-6' onSubmit={handleQuestion}>
        <div className='field'>
          <label className='label' htmlFor='new-title'>
            Title:{' '}
          </label>
          <div className='control'>
            <input
              type='text'
              className='input'
              id='new-title'
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder='e.g. short summary of the subject of the question'
              autoFocus
            />
          </div>
        </div>
        <div className='field'>
          <label className='label' htmlFor='new-question'>
            Question:{' '}
          </label>
          <div className='control'>
            <textarea
              type='text'
              className='textarea'
              id='new-question'
              height='50'
              size='50'
              placeholder='Enter your question here!'
              required
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>
        </div>
        <div className='field is-grouped is-grouped-centered'>
          <div className='control'>
            <button className='button is-success' type='submit'>
              Submit Question
            </button>
          </div>
          <div className='control'>
            <Link className='button is-warning' to={'/'}>
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
