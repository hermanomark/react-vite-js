import Spinner from "./Spinner";

const LoadMore = ({ loadMoreRef, isFetchingNextPage, hasNextPage }) => {
    return (
        <div ref={loadMoreRef} className="h-10 flex justify-center items-center mt-6">
            {isFetchingNextPage
                ? <Spinner />
                : hasNextPage
                    ? "Scroll to load more"
                    : ""}
        </div>
    )
}

export default LoadMore;