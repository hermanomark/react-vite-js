import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import Card from '../components/Card';
import { getAllCards } from '../services/cards';
import GridLayout from '../layouts/GridLayout';
import Header from '../components/Header';
import MainLayout from '../layouts/MainLayout';
import LoadMore from '../components/LoadMore';
import Spinner from '../components/Spinner';
import SearchInput from '../components/SearchInput';
import { useDebounce } from 'react-use';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState('');

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 720, [searchTerm]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['cards', debouncedSearchTerm, selectedCategory],
    queryFn: ({ pageParam = 1 }) => getAllCards(pageParam, 10, debouncedSearchTerm, selectedCategory),
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

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

  if (status === "loading") return <p className="text-gray-700"><Spinner /></p>;
  if (status === "error") return <p className="text-red-700">Error: {error.message}</p>;

  return (
    <>
      <Header header="TCG Cards" />
      <MainLayout>
        <div className='flex flex-row justify-between sm:flex-row gap-4 mb-6 w-full'>
          <SearchInput onSearch={handleSearch} />
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
        {cards.length === 0 && (debouncedSearchTerm || selectedCategory) ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No cards found for {debouncedSearchTerm && selectedCategory
                ? `"${debouncedSearchTerm}" in category "${selectedCategory}"`
                : debouncedSearchTerm
                  ? `"${debouncedSearchTerm}"`
                  : `category "${selectedCategory}"`}
            </p>
          </div>
        ) : (
          <>
            <GridLayout>
              {cards.map((card) => (
                <Card key={card.id} card={card} type='cards' />
              ))}
            </GridLayout>
            <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
          </>
        )}
      </MainLayout>
    </>
  );
}

export default Home;