import { useState } from 'react';

export default function NewAnswer({ setAnswerQuestion }) {
  const [newAnswer, setNewAnswer] = useState('');

  const handleAnswer = (event) => {
    console.log('Handle Answer Called');
    event.preventDefault();
    setAnswerQuestion(false);
  };

  const handleCancel = (event) => {
    console.log('Handle Cancel Called');
    event.preventDefault();
    setAnswerQuestion(false);
  };

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
          <button type='button' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
