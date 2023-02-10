import './WinLose.scss';

const Loser = ({onNewGame}) => {

  const msgs = ["Game Over"];
  
  return (
    <div className="win-lose">
      <span>{msgs[0]}</span>
      <button className='modal-btn' onClick={onNewGame}>Try Again</button>
    </div>
  )
}

export default Loser;