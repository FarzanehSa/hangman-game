import './WinLose.scss';

const Winner = ({onNewGame, wrongAnswer}) => {

  const msgs = ["You Nailed It!", "Well Done!", "Nice Job!  ", "Hip Hip Hooray!", "Hats Off To You!", "Cheers To You!"];
  const randomNum = Math.floor(Math.random() * 6);

  const saved = 6 - wrongAnswer;
  
  return (
    <div className="win-lose">
      <span>{msgs[randomNum]}</span>
      <span className='saved-statement'>Saved {saved === 1 ? `${saved} point` : `${saved} points`}</span>
      <button className='modal-btn' onClick={onNewGame}>Play Again</button>
    </div>
  )
}

export default Winner;