import { useContext } from 'react';
import GeneralContext from "../contexts/GeneralContext";
import './Title.scss';

const Title = () => {

  const { score } = useContext(GeneralContext);

  return (
    <div className="title">
      <span className='t-title'>Hangman</span>
      <span className='t-help'>Guess The Secret Word</span>
      <div className='point'>
        <span>Score: {score.curPoint}</span>
        <span>Best: {score.best}</span>
      </div>
    </div>
  )
}

export default Title;