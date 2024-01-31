import React from "react";

import { INewsArticle, Article } from "../exports";

interface IArticlesListProps {
    articles: INewsArticle[];
    totalResults: number | undefined;
    loading: boolean;
}
export const ArticlesList: React.FC<IArticlesListProps> = ({
    articles,
    totalResults,
    loading,
}) => {
    return (
        <>
            {loading ? (
                <div className="min-h-[80vh] loading glassy-bg"></div>
            ) : (
                <div>
                    {totalResults === 0 ? (
                        <div className="text-center text-3xl">{`No results :(`}</div>
                    ) : null}
                    {totalResults ? (
                        <div>
                            <span className="glassy-bg py-1 px-2 rounded-md inline-block">
                                {totalResults}
                                {totalResults > 1 ? " results" : " result"}
                            </span>
                            <ul className="flex flex-col gap-4 mt-4">
                                {articles.map((article: INewsArticle) => {
                                    return (
                                        <li key={article.url}>
                                            <Article
                                                article={article}
                                                key={article.url}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
};
