import './Winner.scss';

const Winner = ({onNewGame}) => {

  const msgs = ["You Nailed It!", "Well Done!", "Nice Job!  ", "Hip Hip Hooray!", "Hats Off To You!", "Cheers To You!"];
  const randomNum = Math.floor(Math.random() * 6);
  
  return (
    <div className="winner">
      <span>{msgs[randomNum]}</span>
      <button className='modal-btn' onClick={onNewGame}>Play Again</button>
    </div>
  )
}

export default Winner;