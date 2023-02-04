import { useEffect, useState } from 'react';
import axios from 'axios';

import Title from './components/Title';
import Hangman from './components/Hangman';
import Word from './components/Word';
import Control from './components/Control';
import './App.scss';

function App() {

  const [myWord, setMyWord] = useState("");
  const [wordObj, setWordObj] = useState([])
  const [myLetter, setMyLetter] = useState();
  const [wrongAnswer, setWrongAnswer] = useState(0);
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
    // axios.get('https://api.datamuse.com/words?sp=a&max=1')
    // axios.get('https://random-word-api.herokuapp.com/word?length=5')
    axios.get('https://random-word-api.vercel.app/api?words=1')
    .then(res => {
      setMyWord(res.data[0]);
    });

    document.addEventListener("keydown", detectKeyDown, true);

    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };

  }, []);

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
    if (myLetter && myWord.indexOf(myLetter) !== -1) {
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
      setWrongAnswer(pre => pre + 1);
      setKeyboard(keyboard.map(row => {
        if (myLetter === row.letter) {
          return ({...row, check: 2});
        } else return row;
      }));
    }
  }, [myLetter]);

  useEffect(() => {
    if (!wordObj.filter(row => !row.found).length) {
      console.log("Well Done");
    }
  }, [wordObj]);


  const detectKeyDown = (e) => {
    const regexLetter = /^[a-zA-Z]{1}$/;
    if (regexLetter.test(e.key)) {
      setMyLetter(e.key.toLowerCase());
    }
  }

  console.log(myWord, myLetter);
  console.log(wordObj);
  console.log('❌', wrongAnswer);
  console.log('📱', keyboard);

  return (
    <div className="app">
      <div className='a-title'>
        <Title />
      </div>
      <div className='a-hangman' wrongAnswer={wrongAnswer}>
        <Hangman />
      </div>
      <div className='a-word'>
        <Word myWord={myWord} myLetter={myLetter} wordObj={wordObj} setMyLetter={setMyLetter} keyboard={keyboard}/>
      </div>
      <div className='a-control'>
        <Control />
      </div>
    </div>
  );
}

export default App;
