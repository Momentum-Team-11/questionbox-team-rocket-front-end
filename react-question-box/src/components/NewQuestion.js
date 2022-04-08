import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewQuestion({ setNewQuestion }) {
  const navigate = useNavigate();
  const [submitQuestion, setSubmitQuestion] = useState('');

  const handleQuestion = (event) => {
    console.log('Handle Answer Called');
    event.preventDefault();
    setNewQuestion(false);
  };

  const handleCancel = (event) => {
    console.log('Handle Cancel Called');
    event.preventDefault();
    setNewQuestion(false);
    navigate('/');
  };

  return (
    <>
      <h2>New Question</h2>
      <form onSubmit={handleQuestion}>
        <div className='field-controls'>
          <label htmlFor='new-answer'>Question: </label>
          <input
            type='text'
            className='text-input'
            id='new-answer'
            height='50'
            size='50'
            required
            value={submitQuestion}
            onChange={(event) => setSubmitQuestion(event.target.value)}
            autoFocus
          />
        </div>
        <div className='field-controls'>
          <button type='submit'>Submit Question</button>
        </div>
        <div className='field-controls'>
          <button type='button' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
