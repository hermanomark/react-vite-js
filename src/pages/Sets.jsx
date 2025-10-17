import { useEffect, useRef, useState } from 'react';
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import Card from "../components/Card";
import MainLayout from "../layouts/MainLayout";
import GridLayout from "../layouts/GridLayout";
import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllSets } from "../services/sets";
import Spinner from '../components/Spinner';
import SearchInput from '../components/SearchInput';
import { useDebounce } from 'react-use';

const Sets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

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
    queryKey: ['sets', debouncedSearchTerm],
    queryFn: ({ pageParam = 1 }) => getAllSets(pageParam, 10, debouncedSearchTerm),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0 || lastPage.length < 10) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000, 
  });

  const sets = (data?.pages ?? []).flatMap(page =>
    page.filter(set => set.logo)
  ) ?? [];

  const loadMoreRef = useRef(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
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

  if (status === "loading") return <Spinner />;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <>
      <Header header="Sets" />
      <MainLayout >
        <SearchInput onSearch={handleSearch} placeholder='Search for sets...' />
        {sets.length === 0 && debouncedSearchTerm ? (<p className="text-gray-700">No sets found for "{debouncedSearchTerm}"</p>) : (
          <>
            <GridLayout >
              {sets.map((item) => (
                <Card key={item.id} card={item} type='sets' />
              ))}
            </GridLayout>
            <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
          </>
        )}

      </MainLayout>
    </>
  );
}

export default Sets;