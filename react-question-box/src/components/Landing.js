import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <header>
        <h1>QuestionBox</h1>
      </header>
      <div className='auth-buttons'>
        <Link to='/login'>Login</Link>
        <br></br>
        <Link to='/register'>Register</Link>
      </div>
    </>
  );
}
