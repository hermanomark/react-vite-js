const LoadMore = ({ loadMoreRef, isFetchingNextPage, hasNextPage }) => {
    return (
        <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-6">
            {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                    ? "Scroll to load more"
                    : "All cards are loaded"}
        </div>
    )
}

export default LoadMore;