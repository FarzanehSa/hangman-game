import { useEffect, useState, useContext } from 'react';
import GeneralContext from "../contexts/GeneralContext";
import './InputArea.scss';

const InputArea = () => {

  const {secretWordArr, endGame} = useContext(GeneralContext);
  const [classL, setClassL] = useState();
  
  useEffect(() => {
    if (endGame === "lose") {
      setClassL("letter-end");
    } else if (endGame === "no") {
      setClassL("letter-h");
    }
  }, [endGame]); // eslint-disable-line

  const myWordDiv = secretWordArr.map((row, index) => {
    return (
      <div className='letter' key={index}>
        <span className={row.found ? 'letter-v' : `${classL}`}>
          {row.letter.toUpperCase()}
        </span>
      </div>
    )
  });

  return (
    <div className="input-area">
      <div className='showed-correct'>
        {myWordDiv}
      </div>
    </div>
  )
}

export default InputArea;