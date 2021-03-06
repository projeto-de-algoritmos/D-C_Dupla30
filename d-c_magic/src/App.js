import { useState, useEffect } from 'react'
import './App.css';
import { getAllCardsByName } from './services/mtgservice';
import { mergeSort } from './services/mergesort';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentCardSet, setCurrentCardsSet] = useState([]);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(false);
  const [cardName, setCardName] = useState('');
  const [sortBy, setSortBy] = useState('');

  const getDefaultData = async () => {
    setLoading(true);
    await handleSearchByName(cardName);
    setLoading(false)
  }

  const handleSearchByName = async (name, page) => {
    setCurrentPage(1);
    setLoading(true);
    setHasMoreToLoad(true);
    const response = await getAllCardsByName(name, page);
    if (response.length > 0) {
      handleSort(response, sortBy);
    }
    setLoading(false);
  }

  const handleLoadMore = async (name, page) => {
    setLoading(true);
    const response = await getAllCardsByName(name, page + 1);
    if (response.length > 0) {
      setHasMoreToLoad(true);
      const arrayToSort = [...currentCardSet, ...response];
      handleSort(arrayToSort, sortBy);
      setLoading(false);
      setCurrentPage((prev) => prev + 1);
      return;
    }
    setHasMoreToLoad(false);
    setLoading(false);
    return;
  }

  const handleSort = (arrayToSort, sortByType) => {
    const auxArr = [...arrayToSort];
    if (!!sortByType) {
      mergeSort(sortByType, auxArr, 0, arrayToSort.length - 1);
    }
    setCurrentCardsSet(auxArr);
  }

  useEffect(() => getDefaultData(), []);

  useEffect(() => console.log(currentCardSet), [currentCardSet]);

  return (
    <div className="App">
      <div className='searchBar'>
        <label for="cardName">Buscar carta</label>
        <input type="text" id="cardName" onChange={(e) => setCardName(e.target.value)} />
        <button onClick={() => {
          setCurrentCardsSet([])
          handleSearchByName(cardName, 1);
        }} type="button" >Buscar</button>
      </div>
      {
        currentCardSet.length > 0 &&
        <div className='orderByDiv'>
          <label for="orderBy">Ordernar por</label>
          <select name="select" id="orderBy" onChange={(e) => {
            setSortBy(e.target.value)
            handleSort(currentCardSet, e.target.value)
          }}>
            <option disabled selected value> -- Selecione uma op????o -- </option>
            <option value="cmc">CMC (Custo de Mana Convertido)</option>
            <option value="name">Nome</option>
            <option value="setName">Cole????o</option>
          </select>
        </div>
      }
      <div className='mainContainer'>
        <div style={{ display: 'flex', maxWidth: '1120px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {currentCardSet.map((card) =>
            <div className='cardBox' key={card.id}>
              <div><img src={card.imageUrl} width="180" height="auto" /></div>
              <div>
                <p>{card.name}</p>
                <p>CMC: {card.cmc}</p>
                <p>Edi????o: {card.setName}</p>
              </div>
            </div>
          )}
        </div>
        {
          (hasMoreToLoad && currentCardSet.length > 0) &&
          <button className="loadMore" onClick={() => handleLoadMore(cardName, currentPage)} type="button">Carregar mais</button>
        }
      </div>
    </div>
  );
}

export default App;
