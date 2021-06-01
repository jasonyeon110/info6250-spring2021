import './App.css';
import { useState, useEffect } from 'react';
import Contents from './Contents';
import FirstPage from './FirstPage';
import { getFactsService } from './services';
import Loading from './Loading';

function App() {

  const [contentsState, setContentsState] = useState({ isLoading: false, numOfFacts: 0 });
  const [contents, setContents] = useState([]);
  const [factLabel, setFactLabel] = useState('0 Fact Loaded.');
  const [show, setShow] = useState(false);

  const getFacts = () => {
    setContentsState({
      isLoading: true,
    });
    getFactsService()
      .then(response => {
        setContentsState({
          isLoading: false,
        })
        return response;
      })
      .then(fact => setContents(fact))
  }

  return (
    <div className="App">
      <div className="container">
        <h2>{factLabel}</h2>
        {!show && <FirstPage setShow={setShow} getFacts={getFacts} />}
        <Loading contentsState={contentsState} />
        {show && <Contents contents={contents} setFactLabel={setFactLabel} />}
      </div>
    </div>
  );
}

export default App;
