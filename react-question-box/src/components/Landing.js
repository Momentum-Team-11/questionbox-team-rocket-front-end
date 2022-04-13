import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <div className='hero is-warning is-small pb-4'>
        <h1 className='title is-1 has-text-centered has-text-weigh-bold mt-3'>
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
