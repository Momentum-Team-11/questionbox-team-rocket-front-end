import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

export default function NewQuestion({ setNewQuestion, token }) {
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
      <h2>New Question</h2>
      <form onSubmit={handleQuestion}>
        <div className='field-controls'>
          <label htmlFor='new-title'>Title: </label>
          <input
            type='text'
            className='text-input'
            id='new-title'
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
        </div>
        <div className='field-controls'>
          <label htmlFor='new-question'>Question: </label>
          <input
            type='text'
            className='text-input'
            id='new-question'
            height='50'
            size='50'
            required
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>
        <div className='field-controls'>
          <button type='submit'>Submit Question</button>
        </div>
        <div className='field-controls'>
          <Link to={'/'}>Cancel</Link>
        </div>
      </form>
    </>
  );
}
