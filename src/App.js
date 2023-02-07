import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import Title from './components/Title';
import Hangman from './components/Hangman';
import Word from './components/Word';
import Control from './components/Control';
import Winner from './components/Winner';
import Loser from './components/Loser';

import failureSound from './assets/failureSound.wav';
import correctSound from './assets/correctSound.wav';
import winnerSound from './assets/winnerSound.wav';
import loserSound from './assets/loserSound.wav';
import './App.scss';

function App() {

  const [myWord, setMyWord] = useState("");
  const [wordObj, setWordObj] = useState([]);
  const [myLetter, setMyLetter] = useState();
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [winner, setWinner] = useState(false);
  const [loser, setLoser] = useState(false);
  const [endGame, setEndGame] = useState("no");
  const [keyboard, setKeyboard] = useState([
    {letter: "a", show: "A", check: 0},
    {letter: "b", show: "B", check: 0},
    {letter: "c", show: "C", check: 0},
    {letter: "d", show: "D", check: 0},
    {letter: "e", show: "E", check: 0},
    {letter: "f", show: "F", check: 0},
    {letter: "g", show: "G", check: 0},
    {letter: "h", show: "H", check: 0},
    {letter: "i", show: "I", check: 0},
    {letter: "j", show: "J", check: 0},
    {letter: "k", show: "K", check: 0},
    {letter: "l", show: "L", check: 0},
    {letter: "m", show: "M", check: 0},
    {letter: "n", show: "N", check: 0},
    {letter: "o", show: "O", check: 0},
    {letter: "p", show: "P", check: 0},
    {letter: "q", show: "Q", check: 0},
    {letter: "r", show: "R", check: 0},
    {letter: "s", show: "S", check: 0},
    {letter: "t", show: "T", check: 0},
    {letter: "u", show: "U", check: 0},
    {letter: "v", show: "V", check: 0},
    {letter: "w", show: "W", check: 0},
    {letter: "x", show: "X", check: 0},
    {letter: "y", show: "Y", check: 0},
    {letter: "z", show: "Z", check: 0},
  ]);

  useEffect(() => {

    newGame();
    document.addEventListener("keydown", detectKeyDown, false);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };

  }, []);

  const newGame = () => {
    // axios.get('https://api.datamuse.com/words?sp=a&max=1');
    // axios.get('https://random-word-api.herokuapp.com/word?length=5');
    axios.get('https://random-word-api.vercel.app/api?words=1')
    .then(res => {
      setMyWord(res.data[0]);
    });
  }

  const onNewGame = () => {
    newGame();
    closeModal();
    setWrongAnswer(0);
    setEndGame("no")
  }

  useEffect(() => {
    let wArr = [];
    for (let i = 0; i < myWord.length; i++) {
      wArr.push({
        letter: myWord[i],
        found: false
      })
    }
    setWordObj(wArr);
    setWrongAnswer(0);
    setKeyboard(keyboard.map(row => {
      return ({...row, check: 0})
    }))
  }, [myWord]);

  useEffect(() => {
    if (wrongAnswer < 6) {

      if (myLetter && myWord.indexOf(myLetter) !== -1) {
        const au = new Audio(correctSound);
        au.volume = volume;
        au.play();
        setKeyboard(keyboard.map(row => {
          if (myLetter === row.letter) {
            return ({...row, check: 1});
          } else return row;
        }));
        setWordObj(wordObj.map(row => {
          if (row.letter === myLetter) {
            return ({...row, found: true});
          } else {
            return row;
          }
        }));
      } 
      if (myLetter && myWord.indexOf(myLetter) === -1) {
        const au = new Audio(failureSound);
        au.volume = volume;
        au.play();
        setWrongAnswer(pre => pre + 1);
        setKeyboard(keyboard.map(row => {
          if (myLetter === row.letter) {
            return ({...row, check: 2});
          } else return row;
        }));
      }
    }
  }, [myLetter]);

  useEffect(() => {
    if (wordObj.length && !wordObj.filter(row => !row.found).length) {
      setEndGame("win");
      const timer =  setTimeout(() => {
        const au = new Audio(winnerSound);
        au.volume = volume;
        au.play();
        setWinner(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wordObj]);

  useEffect(() => {
    if (wrongAnswer === 6) {
      setEndGame('lose');
      const timer =  setTimeout(() => {
        const au = new Audio(loserSound);
        au.volume = volume;
        au.play();
        setLoser(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wrongAnswer, myWord])


  const detectKeyDown = (e) => {
    const regexLetter = /^[a-zA-Z]{1}$/;
    if (regexLetter.test(e.key)) {
      setMyLetter(e.key.toLowerCase());
    }
  }

  const closeModal = () => {
    setWinner(false);
    setLoser(false);
  }

  console.log(myWord);
  console.log(wordObj);
  console.log('❌', wrongAnswer);
  // console.log('📱', keyboard);
  console.log('📱',endGame);

  return (
    <div className="app">
      <Modal
          isOpen={winner || loser}
          // onRequestClose={closeModal}
          appElement={document.getElementById('root')}
          className="a-modal"
        >
          {winner && <Winner onNewGame={onNewGame}/>}
          {loser && <Loser onNewGame={onNewGame}/>}
      </Modal>
      <div className='a-title'>
        <Title />
      </div>
      <div className='a-hangman'>
        <Hangman wrongAnswer={wrongAnswer} endGame={endGame}/>
      </div>
      <div className='a-word'>
        <Word myWord={myWord} myLetter={myLetter} wordObj={wordObj} setMyLetter={setMyLetter} keyboard={keyboard} endGame={endGame}/>
      </div>
      <div className='a-control'>
        <Control volume={volume} setVolume={setVolume} musicVolume={musicVolume} setMusicVolume={setMusicVolume}/>
      </div>
    </div>
  );
}

export default App;
