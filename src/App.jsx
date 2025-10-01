import { useEffect, useRef } from 'react';
import './App.css';
import { getAllCards, getCardById } from './services/cards';
import { getAllSets, getSetById } from './services/sets';
import { getAllSeries, getSeriesById } from './services/series';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import Card from './components/Card';

const App = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam = 1 }) => getAllCards(pageParam, 10), 
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0 || lastPage.length < 10) {
        return undefined; 
      }
      return allPages.length + 1; 
    },
  });

  const cards = (data?.pages ?? []).flatMap(page =>
    page.filter(card => card.image)
  ) ?? [];

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === "loading") return <p>Loading cards...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

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
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSet = async (id) => {
    try {
      const set = await getSetById(id);

      console.log('Set:', set);

    } catch (error) {
      console.log('Error fetching:', error)

    }
  }


  const fetchAllCards = async (page, itemsPerPage) => {
    try {
      const cardsData = await getAllCards(page, itemsPerPage);

      console.log('All Cards:', cardsData);
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
    // fetchAllSeries();
    // fetchSeries('sv');
    // fetchAllSets();
    // fetchSet('base1');
    // fetchAllCards(1, 20);
    // fetchCard('swsh1-1');
  }, []);

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className="text-3xl font-bold underline mb-3">Pokemon TCG</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Scroll to load more"
            : ""}
      </div>
    </main>
  )
}

export default App
