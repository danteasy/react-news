import React from "react";
import { useStore } from "../exports";

export const Pagination = ({ className = "" }: { className?: string }) => {
    const { updateStore, page, totalPages, totalResults, fetchNews } = useStore(
        state => ({
            updateStore: state.updateStore,
            page: state.page,
            totalPages: state.totalPages,
            totalResults: state.totalResults,
            fetchNews: state.fetchNewsByQuery,
        })
    );
    const paginationArr = () => {
        const arr = [];
        const maxVisiblePages = 2;
        const minPage = 2;
        const maxPage = totalPages!;

        const start = Math.max(minPage, page - maxVisiblePages);
        const end = Math.min(maxPage, page + maxVisiblePages) - 1;

        for (let i = start; i <= end; i++) {
            arr.push(i);
        }

        return arr;
    };

    const handlePagination = (pageToMove: number) => {
        if (page !== pageToMove) {
            updateStore({ page: pageToMove });
            fetchNews();
        }
    };
    return (
        <>
            {totalResults ? (
                <ul
                    className={`py-2 px-2 glassy-bg rounded-md mt-2 flex justify-center gap-2 [&>li]:cursor-pointer items-center ${className}`}
                >
                    <li
                        className={`hover:bg-black hover:text-white py-1 px-1 rounded-md block ${
                            page === 1 ? "opacity-0 pointer-events-none" : ""
                        }`}
                        onClick={() => handlePagination(page - 1)}
                    >{`<`}</li>
                    {totalPages! > 1 && (
                        <li
                            className={`hover:bg-black hover:text-white py-1 px-1 rounded-md block ${
                                page === 1 ? "bg-black text-white" : ""
                            }`}
                            onClick={e => {
                                handlePagination(1);
                            }}
                        >
                            1
                        </li>
                    )}
                    {page > 3 ? <li className="block">...</li> : null}
                    {paginationArr().map(i => {
                        const iKey = "pagination" + i;
                        return (
                            <li
                                key={iKey}
                                className={`hover:bg-black hover:text-white py-1 px-1 rounded-md block ${
                                    i === page ? "bg-black text-white" : ""
                                }`}
                                onClick={() => {
                                    handlePagination(i);
                                }}
                            >
                                {i}
                            </li>
                        );
                    })}
                    {page < totalPages! - 2 ? (
                        <li className="block">...</li>
                    ) : null}

                    <li
                        className={`hover:bg-black hover:text-white py-1 px-1 rounded-md block ${
                            page === totalPages ? "bg-black text-white" : ""
                        }`}
                        onClick={() => handlePagination(totalPages!)}
                    >
                        {totalPages}
                    </li>
                    <li
                        className={`hover:bg-black hover:text-white py-1 px-1 rounded-md block ${
                            page === totalPages!
                                ? "opacity-0 pointer-events-none"
                                : ""
                        }`}
                        onClick={() => handlePagination(page + 1)}
                    >{`>`}</li>
                </ul>
            ) : null}
        </>
    );
};
