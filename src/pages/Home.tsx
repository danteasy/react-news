import React, { useEffect } from "react";

import {
    Header,
    ArticlesList,
    Search,
    SearchFilters,
    Notifications,
    Pagination,
} from "../exports";

import { useStore } from "../exports";

import { IoIosSearch } from "react-icons/io";

export const Home: React.FC = () => {
    const {
        fetchNews,
        articles,
        loading,
        totalResults,
        searchQuery,
        getLanguage,
        updateStore,
    } = useStore(state => ({
        fetchNews: state.fetchNewsByQuery,
        articles: state.articles,
        totalResults: state.totalResults,
        loading: state.loading,
        searchQuery: state.searchQuery,
        updateStore: state.updateStore,
        getLanguage: state.getLanguage,
    }));

    useEffect(() => {
        getLanguage();
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <section>
                <div className="mb-2 w-[30vw] mx-auto">
                    <Search
                        searchValue={searchQuery}
                        keyToChange="searchQuery"
                        handleOnChange={updateStore}
                        onSubmitCb={fetchNews}
                        inputClassName="focus:placeholder:opacity-0 placeholder:transition-opacity"
                        render={() => (
                            <IoIosSearch
                                size="2.5rem"
                                className="cursor-pointer rounded-lg px-[0.25rem] py-[0.25rem] hover:bg-black hover:text-white transition-colors"
                                onClick={() => fetchNews()}
                            />
                        )}
                    />
                    <SearchFilters />
                    <Pagination />
                </div>

                <ArticlesList
                    articles={articles}
                    totalResults={totalResults}
                    loading={loading}
                />
                <Pagination className="mt-8" />
                <Notifications />
            </section>
        </>
    );
};
