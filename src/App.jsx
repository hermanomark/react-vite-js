import { useEffect } from 'react';
import './App.css';
import { getAllCards, getCardById } from './services/cards';
import { getAllSets, getSetById } from './services/sets';
import { getAllSeries, getSeriesById } from './services/series';

const App = () => {
  const fetchAllSeries = async () => {
    try {
      const series = await getAllSeries();

      console.log('All series:', series);
    } catch (error) {
      console.log('Error fetching:', error)

    }
  }


  const fetchSeries = async (id) => {
    try {
      const series = await getSeriesById(id);

      console.log('Series:', series);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAllSets = async () => {
    try {
      const sets = await getAllSets();

      console.log('All sets:', sets);
    } catch(error) {
      console.log(error);
    }
  }

  const fetchSet = async (id) => {
    try {
      const set = getSetById(id);

      console.log('Set:', set);

    } catch (error) {
      console.log('Error fetching:', error)

    }
  }


  const fetchAllCards = async () => {
    try {
      const cards = await getAllCards();

      console.log('All Cards:', cards);

    } catch (error) {
      console.log('Error fetching:', error)
    }
  }

  const fetchCard = async (id) => {
    try {
      const card = await getCardById(id);

      console.log('Card:', card);

    } catch (error) {
      console.log('Error fetching:', error);
    }
  }

  useEffect(() => {
    fetchAllSeries();
    fetchSeries('sv');
    fetchAllSets();
    fetchSet('base1');
    fetchAllCards();
    fetchCard('swsh1-1');
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
    </>
  )
}

export default App
