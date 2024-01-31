import React, { useRef, useState } from "react";

import { INewsArticle, checkImageAccess } from "../exports";

interface IArticleProps {
    article: INewsArticle;
}

export const Article: React.FC<IArticleProps> = ({ article }) => {
    const [loading, setLoading] = useState(true);
    const publishedAt = new Date(article.publishedAt);
    const formattedDate = publishedAt.toLocaleDateString("en-RU", {
        day: "numeric",
        month: "long",
    });
    const formattedTime = publishedAt.toLocaleTimeString("ru-EN", {
        hour: "numeric",
        minute: "numeric",
    });

    const imageRef = useRef("");

    const imageSrc = async () => {
        if (!loading) return;
        const res = await checkImageAccess(article.urlToImage);
        imageRef.current = res as string;
        setLoading(false);
    };
    imageSrc();

    return (
        <a
            href={article.url}
            rel="noopener noreferrer"
            target="_blank"
            className="flex gap-4 overflow-hidden rounded-lg phone:flex-wrap article glassy-bg"
        >
            <div
                className={`min-h-full w-full article-image overflow-hidden ${
                    loading ? "loading" : ""
                }`}
            >
                {!loading ? (
                    <img
                        src={imageRef.current}
                        alt="News preview"
                        className="h-full w-full object-cover transition-transform"
                    />
                ) : null}
            </div>
            <div className="flex flex-col justify-between py-2 pr-2 w-full">
                <div className="flex flex-col items-start">
                    <span className="text-[1.5rem] article-title transition-colors phone:text-[1.25rem]">
                        {article.title}
                    </span>
                    <div className="mt-0.2 mb-2 article-source text-purple-800 transition-colors">
                        {article.source.name}
                    </div>
                    <p className="text-[1.15rem]">{article.description}</p>
                </div>
                <span className="self-end">
                    {formattedDate + ", "}
                    {formattedTime}
                </span>
            </div>
        </a>
    );
};
