import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <div className='hero is-warning is-small pb-4'>
        <h1 className='title is-1 has-text-centered has-text-weigh-bold mt-3'>
          QuestionBox
        </h1>
      </div>
      <div className='columns'>
        <div className='column is-three-fifths is-offset-one-fifth'>
          <div className='card mt-5'>
            <div className='card-content'>
              <div className='content has-text-centered is-size-5'>
                Ever wonder about the meaning of life, but have no idea who to
                ask? Have you puzzled over why cats always land on their feet,
                but didn't know how to find that info?
                <br></br>
                Forget those greedy search engines...
                <br></br>
                <br></br>
                <p className='is-size-4'>
                  Use <b>QuestionBox</b> instead!
                </p>
                <br></br>
                <br></br>
                Why look up accurate and timely information or documentation
                when you can wait around for crowd-sourced, well-meaning yet
                self-absorbed and mostly-useless responses that will refer you
                to that documentation anyways!!!
                <br></br>
                <br></br>
                Register now to come join the fun of offering your best BS about
                things you couldn't possibly know here on...
                <br></br>
                <br></br>
                <b className='is-size-4'>QuestionBox!</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className='auth-buttons columns is-centered'>
        <Link className='button is-large is-primary mx-1' to='/login'>
          Login
        </Link>
        <br></br>
        <Link className='button is-large is-link mx-1' to='/register'>
          Register
        </Link>
      </div>
    </>
  );
}
