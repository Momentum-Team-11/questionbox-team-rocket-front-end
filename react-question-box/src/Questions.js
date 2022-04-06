import { useState } from 'react';
import sampleData from './sampleData';
import NewAnswer from './components/NewAnswer';

export default function Questions(username) {
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [answerQuestion, setAnswerQuestion] = useState(false);

  const handleNewAnswer = (event) => {
    console.log('Handle New Answer Called');
    event.preventDefault();
    setAnswerQuestion(true);
  };

  const handleReturn = (event) => {
    console.log('Handle Return Called');
    event.preventDefault();
    setSelectedQuestion(false);
  };

  return (
    <>
      <hr></hr>
      <header>
        <h1 className='title'>QuestionBox</h1>
        <a href='#'>{`${username.username}`}</a>
      </header>
      <div className='questions-container'>
        {!selectedQuestion ? (
          <>
            <h2>Questions</h2>
            {sampleData.map((q, key) => {
              return (
                <div className='question-box'>
                  <h3 onClick={() => setSelectedQuestion(q)}>{q.question}</h3>
                  <a href='#'>{`${q.author}`}</a>
                </div>
              );
            })}
          </>
        ) : (
          <div className='question-box'>
            <h2>{selectedQuestion.question}</h2>
            {answerQuestion ? (
              <>
                <NewAnswer setAnswerQuestion={setAnswerQuestion} />
              </>
            ) : (
              <>
                <form onSubmit={handleNewAnswer}>
                  <button type='submit'>Answer Question</button>
                </form>
                <div className='answer-box'>
                  {selectedQuestion.answers.map((a, key) => {
                    return (
                      <>
                        <h4>{`${a.author}'s answer`}</h4>
                        <p>{a.answer}</p>
                        {!a.isBest ? (
                          <p style={{ color: 'red' }}>not best...</p>
                        ) : (
                          <p style={{ color: 'green' }}>BEST!</p>
                        )}
                      </>
                    );
                  })}
                </div>
                <form onSubmit={handleReturn}>
                  <button type='submit'>See All Questions</button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
