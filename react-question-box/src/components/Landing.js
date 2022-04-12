import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <div className='hero is-warning is-small'>
        <h1 className='hero-body title has-text-centered has-text-weigh-bold'>
          QuestionBox
        </h1>
      </div>
      <br></br>
      <div className='auth-buttons columns is-centered'>
        <Link className='button is-primary mx-1' to='/login'>
          Login
        </Link>
        <br></br>
        <Link className='button is-link mx-1' to='/register'>
          Register
        </Link>
      </div>
    </>
  );
}
