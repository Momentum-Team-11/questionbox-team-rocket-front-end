import sampleData from '../sampleData';

export default function UserProfile({
  username,
  handleReturn,
  setUserProfile,
  setSelectedQuestion,
}) {
  const handleQuestionSelect = (event) => {
    console.log('Handle Question Select Called');
    setUserProfile(false);
    setSelectedQuestion(event.target.parent);
  };

  return (
    <>
      <h2>{username}</h2>
      <form onClick={handleReturn}>
        <button type='button'>Return to Questions</button>
      </form>
      <h3>Your Questions:</h3>
      {sampleData.map((q, key) => {
        if (q.author === username) {
          return (
            <div className='question-box'>
              <h4 onClick={handleQuestionSelect}>{q.question}</h4>
              <a href='#'>{`${q.author}`}</a>
            </div>
          );
        }
      })}
      <hr></hr>
      <h3>Your Answers:</h3>
      {sampleData.map((q, key) => {
        return (
          <>
            {q.answers.map((a, key) => {
              if (a.author === username) {
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
              }
            })}
          </>
        );
      })}
    </>
  );
}
