import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import Card from '../components/Card';
import { getAllCards, getCardById } from '../services/cards';
import GridLayout from '../layouts/GridLayout';
import Header from '../components/Header';
import MainLayout from '../layouts/MainLayout';
import LoadMore from '../components/LoadMore';

const Home = () => {
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

    if (status === "loading") return <p className="text-gray-700">Loading cards...</p>;
    if (status === "error") return <p className="text-red-700">Error: {error.message}</p>;

    return (
        <>
            <Header header="Pokemon Cards" />
            <MainLayout>
                <GridLayout >
                    {cards.map((card) => (
                        <Card key={card.id} card={card} type='cards' />
                    ))}
                </GridLayout>
                <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
            </MainLayout>
        </>
    );
}

export default Home;