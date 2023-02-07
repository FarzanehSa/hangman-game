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

  const [secretWord, setSecretWord] = useState("");
  const [secretWordArr, setSecretWordArr] = useState([]);
  // 💡 all keyboard charecters, 
  // 💡 check -> 0 : not checked yet - 1: correct - 2: wrong
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
  const [inputLetter, setInputLetter] = useState();
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [endGame, setEndGame] = useState("no");
  // 💡 control modals
  const [winner, setWinner] = useState(false);
  const [loser, setLoser] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [musicVolume, setMusicVolume] = useState(0.5);

  const newGame = () => {
    // 💡 3 different APIs , set secret word!
    // axios.get('https://api.datamuse.com/words?sp=a&max=1');
    // axios.get('https://random-word-api.herokuapp.com/word?length=5');
    axios.get('https://random-word-api.vercel.app/api?words=1')
    .then(res => {
      setSecretWord(res.data[0]);
    });
  }

  useEffect(() => {
    // 💡 run new game and ready to get input characters!
    newGame();
    document.addEventListener("keydown", detectKeyDown, false);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, []);

  useEffect(() => {
    // 💡 after get the secret word, create the word arr.
    // 💡 make sure wrong answer is 0.
    // 💡 and keyboards are all in position that not checked letters.
    // 💡 set endGame state
    // close All modals
    const wordArr = secretWord.split('').map(char => {
      return ({
        letter: char,
        found: false,
      })
    });
    setSecretWordArr(wordArr);
    setWrongAnswer(0);
    setEndGame("no");
    setKeyboard(k => k.map(row => {
      return ({...row, check: 0})
    }));
    closeModal();
  }, [secretWord]);

  useEffect(() => {
    // 💡 1) wrongAnswer should be less than 6 
    // 💡 2) inputLetter should be valid charecter
    // 💡 3) not previously checked
    if (wrongAnswer < 6 
      && inputLetter 
      && !keyboard.filter(row => row.letter === inputLetter)[0].check)
    {
      // 💡 you found letter -> play sound, update keyboard and secretWordArr
      if (secretWord.indexOf(inputLetter) !== -1) {
        const au = new Audio(correctSound);
        au.volume = volume;
        au.play();
        setKeyboard(k => k.map(row => {
          if (row.letter === inputLetter) {
            return ({...row, check: 1});
          } else return row;
        }));
        setSecretWordArr(s => s.map(row => {
          if (row.letter === inputLetter) {
            return ({...row, found: true});
          } else {
            return row;
          }
        }));
      } 
      // 💡 you guess wrong -> play sound, update keyboard and wrongAnswer
      if (secretWord.indexOf(inputLetter) === -1) {
        const au = new Audio(failureSound);
        au.volume = volume;
        au.play();
        setWrongAnswer(pre => pre + 1);
        setKeyboard(k => k.map(row => {
          if (inputLetter === row.letter) {
            return ({...row, check: 2});
          } else return row;
        }));
      }
    }
  }, [inputLetter]); // eslint-disable-line

  useEffect(() => {
    // 💡 find out when you win
    // 💡 send endGame win to other components
    // 💡 after delay play sound and open modal
    if (secretWordArr.length && !secretWordArr.filter(row => !row.found).length) {
      setEndGame("win");
      const timer =  setTimeout(() => {
        const au = new Audio(winnerSound);
        au.volume = volume;
        au.play();
        setWinner(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [secretWordArr]); // eslint-disable-line

  useEffect(() => {
    // 💡 find out when you lose
    // 💡 send endGame lose to other components
    // 💡 after delay play sound and open modal
    if (wrongAnswer >= 6) {
      setEndGame('lose');
      const timer =  setTimeout(() => {
        const au = new Audio(loserSound);
        au.volume = volume;
        au.play();
        setLoser(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wrongAnswer]); // eslint-disable-line

  // 💡 accept only 26 charecters as input.
  const detectKeyDown = (e) => {
    const regexLetter = /^[a-zA-Z]{1}$/;
    if (regexLetter.test(e.key)) {
      setInputLetter(e.key.toLowerCase());
    }
  }

  const closeModal = () => {
    setWinner(false);
    setLoser(false);
  }

  console.log('🗝', secretWord);
  // console.log('❌', wrongAnswer);

  return (
    <div className="app">
      <Modal
        isOpen={winner || loser}
        // onRequestClose={closeModal}
        appElement={document.getElementById('root')}
        className="a-modal"
      >
        {winner && <Winner onNewGame={newGame}/>}
        {loser && <Loser onNewGame={newGame}/>}
      </Modal>
      <div className='a-title'>
        <Title />
      </div>
      <div className='a-hangman'>
        <Hangman wrongAnswer={wrongAnswer} endGame={endGame}/>
      </div>
      <div className='a-word'>
        <Word secretWordArr={secretWordArr} setInputLetter={setInputLetter} keyboard={keyboard} endGame={endGame}/>
      </div>
      <div className='a-control'>
        <Control volume={volume} setVolume={setVolume} musicVolume={musicVolume} setMusicVolume={setMusicVolume}/>
      </div>
    </div>
  );
}

export default App;