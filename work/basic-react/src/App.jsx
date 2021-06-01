import './App.css';
import Play from './Play';
import Result from './Result'
import { useState } from 'react';
import PlayAgain from './PlayAgain';

function App() {

  const [word, setWord] = useState();
  const [input, setValue] = useState("");

  const reset = () => {
    setWord('');
    document.getElementById('guessed-word').value = '';
  };

  return (
    <div className="app">
      <Play setWord={setWord} input={input} setValue={setValue} />
      {word && <Result word={word} />}
      {word && <PlayAgain onReset={reset} />}
    </div>
  );
};

export default App;