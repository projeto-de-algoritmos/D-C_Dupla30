import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { getAllCardsByName, getAllCardsByColor } from './services/mtgservice';
import { mergeSort } from './services/mergesort';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentCardSet, setCurrentCardsSet] = useState([]);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(false);
  const [cardName, setCardName] = useState('nissa');
  const [sortBy, setSortBy] = useState('cmc');

  const getDefaultData = async () => {
    setLoading(true);
    await handleSearchByName(cardName);
    setLoading(false)
  }

  const handleSearchByName = async (name) => {
    setCurrentPage(1);
    setLoading(true);
    setHasMoreToLoad(true);
    const response = await getAllCardsByName(name, currentPage);
    if (response.length > 0) {
      handleSort(response, sortBy);
    }
    setLoading(false);
  }

  const handleLoadMore = async (name, page) => {
    setLoading(true);
    const response = await getAllCardsByName(name, page);
    if (response.length > 0) {
      setHasMoreToLoad(true);
      console.log('curr set', currentCardSet)
      const arrayToSort = [...currentCardSet, ...response];
      console.log('to sort', arrayToSort);
      handleSort(arrayToSort, sortBy);
      setLoading(false);
      return;
    }
    setHasMoreToLoad(false);
    setLoading(false);
    return;
  }

  const handleSort = (arrayToSort, sortByType) => {
    const auxArr = [...arrayToSort];
    mergeSort(sortByType, auxArr, 0, arrayToSort.length - 1);
    setCurrentCardsSet(auxArr);
    setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => getDefaultData(), []);

  useEffect(() => console.log(currentCardSet), [currentCardSet]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {
          hasMoreToLoad &&
          <button onClick={() => handleLoadMore(cardName, currentPage)} type="button">Carregar mais</button>
        }
      </header>
    </div>
  );
}

export default App;
