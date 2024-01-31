import React from "react";
import { Select, useStore } from "../exports";

export const SearchFilters: React.FC = () => {
    const { updateStore, fetchNews, changeLanguage, newsLanguages } = useStore(
        state => ({
            updateStore: state.updateStore,
            fetchNews: state.fetchNewsByQuery,
            changeLanguage: state.changeLanguage,
            newsLanguages: state.newsLanguages,
        })
    );
    const pageSizeOptions = [10, 25, 40, 50, 75, 100].map(i => ({
        value: i,
        label: i,
    }));
    return (
        <ul className="flex items-center gap-4 text-center">
            <li>
                <div>Sort by</div>
                <Select
                    onChange={e => {
                        updateStore({ sortBy: e.target.value });
                        fetchNews();
                    }}
                    value={useStore(state => state.sortBy)}
                    options={[
                        { value: "relevancy", label: "Relevancy" },
                        { value: "popularity", label: "Popularity" },
                        { value: "publishedAt", label: "Newest" },
                    ]}
                />
            </li>
            <li>
                <div>Amount</div>
                <Select
                    onChange={e => {
                        updateStore({ pageSize: +e.target.value });
                        fetchNews();
                    }}
                    value={useStore(state => state.pageSize)}
                    options={pageSizeOptions}
                />
            </li>
            <li>
                <div>Language</div>
                <Select
                    onChange={e => {
                        updateStore({ page: 1 });
                        changeLanguage(e.target.value);
                        fetchNews();
                    }}
                    value={useStore(state => state.language.key)}
                    options={newsLanguages.map(i => ({
                        label: i.value,
                        value: i.key,
                    }))}
                />
            </li>
        </ul>
    );
};
