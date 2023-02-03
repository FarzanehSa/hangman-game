import './App.scss';

import Title from './components/Title';
import Hangman from './components/Hangman';
import Word from './components/Word';

function App() {
  return (
    <div className="app">
      <div className='a-title'>
        <Title />
      </div>
      <div className='a-hangman'>
        <Hangman />
      </div>
      <div className='a-word'>
        <Word />
      </div>
    </div>
  );
}

export default App;
