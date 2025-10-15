import { useEffect, useRef } from 'react';
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import Card from "../components/Card";
import MainLayout from "../layouts/MainLayout";
import GridLayout from "../layouts/GridLayout";
import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllSeries } from "../services/series";
import Spinner from '../components/Spinner';

const Series = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['series'],
        queryFn: ({ pageParam = 1 }) => getAllSeries(pageParam, 10),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length === 0 || lastPage.length < 10) {
                return undefined;
            }
            return allPages.length + 1;
        },
    });

    const series = (data?.pages ?? []).flatMap(page =>
        page.filter(card => card.logo)
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

    if (status === "loading") return <Spinner />;
    if (status === "error") return <p>Error: {error.message}</p>;


    return (
        <>
            <Header header="Series" />
            <MainLayout >
                <GridLayout >
                    {series.map((item) => (
                        <Card key={item.id} card={item} type='series' />
                    ))}
                </GridLayout>
                <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
            </MainLayout>
        </>
    );
}

export default Series;