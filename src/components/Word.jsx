import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import './Word.scss';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

const Word = ({secretWordArr, setInputLetter, keyboard, endGame}) => {

  const [classL, setClassL] = useState();
  
  useEffect(() => {
    if (endGame === "lose") {
      console.log('here');
      setClassL("letter-end");
    } else if (endGame === "no") {
      setClassL("letter-h");
    }
    console.log(classL);
  }, [endGame]);

  const myWordDiv = secretWordArr.map((row, index) => {
    return (
      <div className='letter' key={index}>
        <span className={row.found ? 'letter-v' : `${classL}`}>
          {row.letter}
        </span>
      </div>
    )
  });

  const charButtonArr = keyboard.map((row, index) => {
    let classN = 'char-btn';
    if (row.check === 1) classN += ' char-btn-correct';
    if (row.check === 2) classN += ' char-btn-wrong';

    return (
      <button 
        className={classN}
        key={index}
        onClick={() => {setInputLetter(row.letter)}}
        disabled={row.check}>{row.show}
        <div className={row.check === 2 ? "diag-line-show" : "diag-line-hidden"}></div>
      </button>)
  })

  return (
    <div className="word">
      <div className='char-btns'>
        {charButtonArr}
      </div>

      <div className='showed-correct'>
        {myWordDiv}
      </div>
      
    </div>
  )
}

export default Word;