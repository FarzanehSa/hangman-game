import { useContext } from 'react';

import GeneralContext from "../contexts/GeneralContext";
import './Keyboard.scss';

const Keyboard = () => {

  const {setInputLetter, keyboard} = useContext(GeneralContext);

  const charButtonArr = keyboard.map((row, index) => {
    let classN = 'char-btn';
    if (row.check) {classN += ' char-btn-inactive';}

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
    <div className="keyboard">
      <div className='char-btns'>
        {charButtonArr}
      </div>
    </div>
  )
}

export default Keyboard;