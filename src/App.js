import { useEffect, useState } from 'react';
import axios from 'axios';

import Title from './components/Title';
import Hangman from './components/Hangman';
import Word from './components/Word';
import Control from './components/Control';
import './App.scss';

function App() {

  const [myWord, setMyWord] = useState("");

  useEffect(() => {
    // axios.get('https://api.datamuse.com/words?sp=a&max=1')
    // axios.get('https://random-word-api.herokuapp.com/word?length=5')
    axios.get('https://random-word-api.vercel.app/api?words=1')
    .then(res => {
      setMyWord(res.data[0]);
    });
  }, []);

  console.log(myWord);

  return (
    <div className="app">
      <div className='a-title'>
        <Title />
      </div>
      <div className='a-hangman'>
        <Hangman />
      </div>
      <div className='a-word' myWord={myWord}>
        <Word />
      </div>
      <div className='a-control'>
        <Control />
      </div>
    </div>
  );
}

export default App;
